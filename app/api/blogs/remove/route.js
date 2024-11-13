import connectDB from "@lib/config/db";
import activityModel from "@lib/models/activityModel";
import blogModel from "@lib/models/blogModel";
import userModel from "@lib/models/userModel";
import { getToken } from "next-auth/jwt";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(request) {
  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Access Denied" },
      { status: 401 }
    );
  }

  if (user.user_type !== "admin") {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { blog_id, draft } = body;

  if (!blog_id) {
    return NextResponse.json(
      { success: false, message: "No blog parsed" },
      { status: 400 }
    );
  }

  let blogImages = [];

  try {
    await connectDB();

    const blog = await blogModel.findOneAndDelete({ blog_id });

    if (blog?.banner_key) {
      blogImages.push(blog.banner_key);
    }

    blog.content[0].blocks.map((block, index) => {
      if (block.type == "image" && block.data.file.key) {
        blogImages.push(block.data.file.key);
      }
    });

    if (blogImages.length) {
      const utapi = new UTApi();
      const utres = await utapi.deleteFiles(blogImages);
    }

    if (draft) {
      await userModel.findOneAndUpdate(
        { _id: blog.author },
        {
          $inc: { "account_info.total_drafts": -1 },
          $pull: { blogs: blog._id },
        }
      );
    } else {
      await userModel.findOneAndUpdate(
        { _id: blog.author },
        {
          $inc: { "account_info.total_posts": -1 },
          $pull: { blogs: blog._id },
        }
      );

      const activity = new activityModel({
        title: blog.title,
        type: "blog_del",
        author: user.user_id,
      });

      await activity.save();
    }

    revalidatePath(`/blogs/${blog_id}`, "page");
    revalidatePath("/blogs", "page");

    return NextResponse.json(
      {
        success: true,
        message: "Blog Deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong somewhere",
      },
      { status: 500 }
    );
  }
}
