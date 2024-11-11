import connectDB from "@lib/config/db";
import blogModel from "@lib/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    const blogs = await blogModel
      .find({ draft: false })
      .populate(
        "author",
        "personal_info.first_name personal_info.last_name personal_info.profile_img -_id"
      )
      .sort({ total_reads: -1, publishedAt: -1 })
      .limit(3);

    return NextResponse.json(
      {
        success: true,
        message: "Trending blogs retrieved successfully",
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong somewhere",
        data: [],
      },
      { status: 500 }
    );
  }
}
