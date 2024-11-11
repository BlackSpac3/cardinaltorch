import connectDB from "@lib/config/db";
import blogModel from "@lib/models/blogModel";
import userModel from "@lib/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { blog_id, mode } = body;

  let incrementVal = mode == "edit" ? 0 : 1;

  try {
    await connectDB();
    const blog = await blogModel
      .findOneAndUpdate({ blog_id }, { $inc: { total_reads: incrementVal } })
      .populate(
        "author",
        "personal_info.first_name personal_info.last_name personal_info.profile_img personal_info.email -_id"
      )
      .select(
        "blog_id title banner desc tags content total_reads publishedAt draft"
      );

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog does not exist or has been deleted",
        },
        { status: 404 }
      );
    } else {
      await userModel.findOneAndUpdate(
        { "personal_info.email": blog.author.personal_info.email },
        {
          $inc: { "account_info.total_reads": incrementVal },
        }
      );

      return NextResponse.json(
        {
          success: true,
          message: `${blog.title} retrieved successfully`,
          data: blog,
        },
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
