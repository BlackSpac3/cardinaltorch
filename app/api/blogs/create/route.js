import connectDB from "@lib/config/db";
import activityModel from "@lib/models/activityModel";
import blogModel from "@lib/models/blogModel";
import userModel from "@lib/models/userModel";
import { nanoid } from "nanoid";
import { getToken } from "next-auth/jwt";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(request) {
  //validate session
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

  //collect blog data
  const formData = await request.formData();

  const id = formData.get("id");
  const title = formData.get("title");
  const desc = formData.get("desc");
  let banner = formData.get("banner");
  let content = JSON.parse(formData.get("content"));
  const tags = JSON.parse(formData.get("tags"));
  let draft = JSON.parse(formData.get("draft"));
  draft = Boolean(draft);
  let blogImages = [];
  let banner_key = "";

  // create blog id
  let blog_id =
    id ||
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();

  //validate blog data
  if (!title.length) {
    return NextResponse.json(
      {
        success: false,
        message: "You must provide a title for your blog",
      },
      { status: 400 }
    );
  }

  if (!draft) {
    if (!desc.length || desc.length > 200) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You must provide a description for your blog under 200 characters",
        },
        { status: 400 }
      );
    }

    if (!content.blocks.length) {
      return NextResponse.json(
        {
          success: false,
          message: "You must provide content for your blog",
        },
        { status: 400 }
      );
    }

    if (!tags.length || tags.length > 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Provide tags in order to publish",
        },
        { status: 400 }
      );
    }
  }

  //collect blogImages file
  content.blocks.map((block, index) => {
    if (block.type == "image") {
      if (block.data.file.id) {
        const file = formData.get(block.data.file.id);

        if (!block.data.file.key) {
          blogImages.push(file);
        }
      }
    }
  });

  //collect banner file
  if (typeof banner === "object") {
    blogImages.push(banner);
  }

  try {
    // upload blog images and banner files
    if (blogImages.length) {
      const utapi = new UTApi();
      const imagesUploadResponse = await utapi.uploadFiles(blogImages);

      //update blog images url
      content.blocks.map((block, index) => {
        if (block.type == "image") {
          imagesUploadResponse.map((uploadedFileData, index) => {
            if (block.data.file.id == uploadedFileData.data.name) {
              block.data.file.url = uploadedFileData.data.url;
              block.data.file.key = uploadedFileData.data.key;
            }
          });
        }
      });

      //update banner file to url
      if (typeof banner === "object") {
        const bannerFileData = imagesUploadResponse.slice(-1)[0];
        banner = bannerFileData.data.url;
        banner_key = bannerFileData.data.key;
      }
    }

    await connectDB();

    if (id) {
      //update existing blog
      await blogModel.findOneAndUpdate(
        { blog_id },
        { title, desc, banner, banner_key, content, tags, draft }
      );
      return NextResponse.json(
        {
          success: true,
          message: draft ? "Draft Saved" : "Blog Updated",
        },
        { status: 200 }
      );
    } else {
      // create blog model
      const blog = new blogModel({
        blog_id,
        title,
        banner,
        banner_key,
        desc,
        content,
        tags,
        author: user.user_id,
        draft,
      });

      //save blog
      await blog.save();

      //update user data
      if (blog.draft) {
        await userModel.findOneAndUpdate(
          { _id: user.user_id },
          {
            $inc: { "account_info.total_drafts": 1 },
            $push: { blogs: blog._id },
          }
        );
      } else {
        await userModel.findOneAndUpdate(
          { _id: user.user_id },
          {
            $inc: { "account_info.total_posts": 1 },
            $push: { blogs: blog._id },
          }
        );

        //log activity
        const activity = new activityModel({
          title,
          type: "blog_add",
          author: user.user_id,
        });

        await activity.save();
      }

      revalidatePath("/blogs/[blog_id]", "page");
      revalidatePath("/blogs");

      return NextResponse.json(
        { success: true, message: blog.draft ? "Draft Saved" : "Published" },
        { status: 200 }
      );
    }
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
