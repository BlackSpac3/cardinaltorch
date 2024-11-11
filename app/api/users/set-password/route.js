import connectDB from "@lib/config/db";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import userModel from "@lib/models/userModel";
import { verifyResetPassToken } from "@app/actions";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;

export async function POST(request) {
  const body = await request.json();
  let { token, password } = body;

  let id;
  if (!token) {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session) {
      return NextResponse.json({ success: false, message: "Access Denied" });
    }

    id = session.user_id;
  } else {
    const tokenRes = await verifyResetPassToken(token);

    if (!tokenRes.success) {
      return NextResponse.json(tokenRes, { status: 400 });
    }

    id = tokenRes.user;
  }

  if (!passwordRegex.test(password)) {
    return NextResponse.json({
      success: false,
      message: "Set a stronger password",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const encryptedPass = await bcrypt.hash(password, salt);

  try {
    await connectDB();
    await userModel.findOneAndUpdate(
      { _id: id },
      {
        "personal_info.password": encryptedPass,
        "account_info.default_pass": false,
      }
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
