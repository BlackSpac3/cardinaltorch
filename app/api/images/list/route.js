import connectDB from "@lib/config/db";
import imageModel from "@lib/models/imageModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  let { query, author_id, page, max } = body;
  let findQuery;

  if (query && author_id) {
    findQuery = { desc: new RegExp(query, "i"), author: author_id };
  } else if (query) {
    findQuery = { desc: new RegExp(query, "i") };
  } else if (author_id) {
    findQuery = { author: author_id };
  }

  try {
    await connectDB();
    const images = await imageModel
      .find(findQuery)
      .populate(
        "author",
        "personal_info.first_name personal_info.last_name personal_info.profile_img -_id"
      )
      .sort({ uploadedAt: -1 })
      .skip((page - 1) * max)
      .limit(max);

    return NextResponse.json({
      success: true,
      message: "Image retrieved successfully",
      data: images,
    });
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
