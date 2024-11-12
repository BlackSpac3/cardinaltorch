import connectDB from "@lib/config/db";
import userModel from "@lib/models/userModel";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;

const genPass = () => {
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const symbols = "!@#$&";
  const numbers = "0123456789";
  const chars = upperCase + lowerCase + symbols + numbers;
  const passwordLength = 8;
  let password = "";

  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  while (!passwordRegex.test(password)) {
    password = password.split("");
    password[Math.floor(Math.random() * password.length)] =
      lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password[Math.floor(Math.random() * password.length)] =
      upperCase[Math.floor(Math.random() * upperCase.length)];
    password[Math.floor(Math.random() * password.length)] =
      symbols[Math.floor(Math.random() * symbols.length)];
    password[Math.floor(Math.random() * password.length)] =
      numbers[Math.floor(Math.random() * numbers.length)];
    password = password.join("");
  }

  return password;
};

export async function POST(request) {
  const body = await request.json();
  let { first_name, last_name, password, email, user_type } = body;

  let type;
  !user_type ? (type = "user") : (type = user_type);

  if (!password) {
    password = genPass();
  }

  try {
    await connectDB();
    const exists = await userModel.findOne({ "personal_info.email": email });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email",
        },
        { status: 400 }
      );
    }

    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please use a stronger password",
        },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);

    const encryptedPass = await bcrypt.hash(password, salt);

    const userData = new userModel({
      personal_info: {
        first_name,
        last_name,
        email,
        password: encryptedPass,
      },
      account_info: {
        type,
      },
    });

    await userData.save();

    const html = `
    <div style="background-color: #2fae60; padding: 15px">
      <h1 style="text-align: center; color: white">
        Welcome to Cardinal Torch
      </h1>
    </div>
    <p>
      You can now create relevant and useful articles and photographs for our
      readers. Your login details are provided below. Once again, welcome to the
      team.
    </p>
    <br />
    <p><b>Account Details</b></p>
    <p>Email: ${email}</p>
    <p>Password: ${password}</p>
    <br />
    <p>Please remember to update your password when you log in</p>
    <a href="https://localhost:3000/login" target="_blank"
      ><button
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
        Login Now
      </button></a
    >
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

    const info = await transporter.sendMail({
      from: { name: "Cardinal Torch", address: process.env.MAIL_USER },
      to: email,
      subject: "Welcome To Cardinal Torch Content Management Team",
      html,
    });

    console.log("Logging info....");

    console.log(info);

    return NextResponse.json(
      {
        success: true,
        message: `${
          first_name[0].toUpperCase() + first_name.slice(1)
        } added successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong somehwere" },
      { status: 500 }
    );
  }
}
