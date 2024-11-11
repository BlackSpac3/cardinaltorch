import connectDB from "@lib/config/db";
import userModel from "@lib/models/userModel";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Access Denied" },
      { status: 401 }
    );
  }

  if (session.user_type !== "admin") {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();
  let { acct_type, query } = body;
  let findQuery;

  if (query && acct_type) {
    findQuery = {
      $or: [
        { "personal_info.first_name": new RegExp(query, "i") },
        { "personal_info.last_name": new RegExp(query, "i") },
        { "personal_info.email": new RegExp(query, "i") },
      ],
      "account_info.type": acct_type,
      _id: { $nin: [session.user_id] },
      "personal_info.email": { $nin: ["admin@supra.com"] },

      disabled: false,
    };
  } else if (query) {
    findQuery = {
      $or: [
        { "personal_info.first_name": new RegExp(query, "i") },
        { "personal_info.last_name": new RegExp(query, "i") },
        { "personal_info.email": new RegExp(query, "i") },
      ],
      _id: { $nin: [session.user_id] },
      "personal_info.email": { $nin: ["admin@supra.com"] },

      disabled: false,
    };
  } else if (acct_type) {
    findQuery = {
      "account_info.type": acct_type,
      _id: { $nin: [session.user_id] },
      "personal_info.email": { $nin: ["admin@supra.com"] },
      disabled: false,
    };
  } else {
    findQuery = {
      _id: { $nin: [session.user_id] },
      disabled: false,
      "personal_info.email": { $nin: ["admin@supra.com"] },
    };
  }

  try {
    await connectDB();
    const users = await userModel
      .find(findQuery)
      .select("-personal_info.password -updatedAt -blogs -__v")
      .sort({ joinedAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
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
