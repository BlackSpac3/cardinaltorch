import connectDB from "@lib/config/db";
import userModel from "@lib/models/userModel";
import { NextResponse } from "next/server";
import validator from "validator";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(request) {
  const body = await request.json();
  const { email } = body;

  //validate mail format
  if (!validator.isEmail(email)) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter a valid email",
      },
      { status: 400 }
    );
  }
  try {
    await connectDB();

    //validate if mail is registered
    const user = await userModel.findOne({
      "personal_info.email": email,
      disabled: false,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User does not exist",
        },
        { status: 400 }
      );
    }

    //generate access token
    const token = jwt.sign({ id: user._id }, process.env.NEXTAUTH_SECRET, {
      expiresIn: "1d",
    });

    const { first_name } = user.personal_info;

    //forgot password mail template
    const html = `
  <h2 style="color: #2fae60">Change Password</h2>
    <p><b>Hello ${first_name},</b></p>
    <p>
      We have recieved a password change request for your Cardinal Torch
      account ${email}. <b>The password reset is only valid for the next 24 hours.</b>
    </p>
    <p>
      If yoiu did not request to change your password, then you can ignore this
      email and your password will not be changed. 
    </p>
    <br />
    <a href=${process.env.NEXTAUTH_URL}/reset-password/${token}>
      <button
        style="
          cursor: pointer;
          padding: 8px 20px;
          border-radius: 6px;
          background-color: #2fae60;
          outline: noune;
          border: none;
          color: white;
          font-size: medium;
        "
      >
        Reset password
      </button>
    </a>
  `;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_KEY,
      },
    });
    const mailData = {
      from: { name: "Cardinal Torch", address: process.env.MAIL_USER },
      to: email,
      subject: "Cardinal Torch Password Change Request",
      html,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });

    return NextResponse.json(
      { success: true, message: "Instructions Sent to Email" },
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
