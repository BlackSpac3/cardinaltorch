import connectDB from "@lib/config/db";
import imageModel from "@lib/models/imageModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = request.json();
  let { query, author_id } = body;
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
    const count = await imageModel.countDocuments(findQuery);

    return NextResponse.json({ success: true, totalDocs: count });
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
