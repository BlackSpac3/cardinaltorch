import connectDB from "@lib/config/db";
import { NextResponse } from "next/server";
import blogModel from "@lib/models/blogModel";

export async function POST(request) {
  const body = await request.json();
  let { author_id, query, tag, tags, draft, eliminate_blog } = body;
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
    const count = await blogModel.countDocuments(findQuery);

    return NextResponse.json(
      { success: true, totalDocs: count },
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
