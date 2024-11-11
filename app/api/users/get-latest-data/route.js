import connectDB from "@lib/config/db";
import userModel from "@lib/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { email } = body;

  try {
    await connectDB();
    const user = await userModel
      .findOne({ "personal_info.email": email })
      .select(
        "-personal_info.password -updatedAt -blogs -__v -account_info.default_pass -account_info.email_validation_status -account_info.type "
      );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User data retrieved",
        data: user.account_info,
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
