import connectDB from "@lib/config/db";
import userModel from "@lib/models/userModel";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;
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

  const body = await request.json();
  let { currPassword, newPassword } = body;

  if (!passwordRegex.test(newPassword)) {
    return NextResponse.json(
      { success: false, message: "Set a stronger password" },
      { status: 400 }
    );
  }

  const user = await userModel.findOne({ _id: session.user_id });

  const match = await bcrypt.compare(currPassword, user.personal_info.password);

  if (!match) {
    return NextResponse.json(
      { success: false, message: "Incorrect Password" },
      { status: 400 }
    );
  }

  const salt = await bcrypt.genSalt(10);

  const encryptedPass = await bcrypt.hash(newPassword, salt);

  try {
    await connectDB();
    await userModel.findOneAndUpdate(
      { _id: session.user_id },
      { "personal_info.password": encryptedPass }
    );
    return NextResponse.json(
      { success: true, message: "Password Updated" },
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
