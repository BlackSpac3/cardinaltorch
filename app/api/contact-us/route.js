import { emailRegex } from "@utils";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const html = (name, email, message, company, number) => {
  return `
    <h1>Message from ${name}</h1>
    <br/>
    <p>${message}</p>
    <br/>
    <p>Return Mail: <a href='mailto:${email}'>${email}</a></p>
    ${number && `<p>Phone Number: ${number}</p>`}
    ${company && `<p>Company: ${company}</p>`}
    
    `;
};

export async function POST(request) {
  const formData = await request.formData();

  const sender = {
    name: formData.get("name"),
    email: formData.get("email"),
    number: formData.get("number"),
    company: formData.get("company"),
    message: formData.get("message"),
  };

  if (!sender.name) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter your name",
      },
      { status: 400 }
    );
  }

  if (!sender.email || !emailRegex.test(sender.email)) {
    return NextResponse.json(
      {
        success: false,
        message: "Please provide a valid email",
      },
      { status: 400 }
    );
  }

  if (!sender.message) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter your name",
      },
      { status: 400 }
    );
  }

  try {
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
      from: { name: sender.name, address: sender.email },
      to: "info@cardinaltorch.com",
      subject: `Message from ${sender.name} || ${sender.email}`,
      html: html(
        sender.name,
        sender.email,
        sender.message,
        sender.company,
        sender.number
      ),
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
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong somewhere" },
      { status: 500 }
    );
  }
}
