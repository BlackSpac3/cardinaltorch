import connectDB from "@lib/config/db";
import userModel from "@lib/models/userModel";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

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
  const { id } = body;

  try {
    await connectDB();

    const userData = await userModel.findByIdAndUpdate(id, { disabled: true });

    return NextResponse.json(
      {
        success: true,
        message: `${userData.personal_info.first_name} removed successfully`,
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
