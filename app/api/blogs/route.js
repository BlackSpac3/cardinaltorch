import connectDB from "@lib/config/db";
import blogModel from "@lib/models/blogModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  let { author_id, tags, query, page, max, draft, eliminate_blog } = body;
  draft = Boolean(draft);
  let findQuery;

  if (eliminate_blog) {
    findQuery = {
      tags: { $in: tags },
      draft,
      blog_id: { $ne: eliminate_blog },
    };
  } else if (query && author_id) {
    findQuery = {
      $or: [
        { title: new RegExp(query, "i") },
        { tags: new RegExp(query, "i") },
        { desc: new RegExp(query, "i") },
      ],
      author: author_id,
      draft,
    };
  } else if (query) {
    findQuery = {
      $or: [
        { title: new RegExp(query, "i") },
        { tags: new RegExp(query, "i") },
        { desc: new RegExp(query, "i") },
      ],
      draft,
    };
  } else if (author_id) {
    findQuery = { author: author_id, draft };
  } else {
    findQuery = { draft };
  }

  try {
    await connectDB();
    const blogs = await blogModel
      .find(findQuery)
      .populate(
        "author",
        "personal_info.first_name personal_info.last_name personal_info.profile_img _id"
      )
      .sort({ publishedAt: -1 })
      .skip((page - 1) * max)
      .limit(max);

    return NextResponse.json(
      {
        success: true,
        message: "Blogs retrieved successfully",
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
