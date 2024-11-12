import connectDB from "@lib/config/db";
import subscriberModel from "@lib/models/subscriberModel";
import { NextResponse } from "next/server";
import json2csv from "json2csv";
import nodemailer from "nodemailer";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const infoHtml = (email) => {
  return `
  <h1>New Subscriber</h1>
  <br/>
  <p>${email} just suscribed to the Newsletter.
  <br/>
   You can find the latest list of subscriber's emails in the CSV file attached below
  </p>
  `;
};

const subscriberHtml = `
  <h1>Thanks for subscribing!</h1>
  <br/>
  <p>The Cardinal Torch's newsletter is the best way to find out about our current deals and market trends developments.
  <br/>
  <br/>
  Once or twice a month, you will receive a newsletter with information about Cardinal Torch products major updates, special offers, great deals and much more.
  <br/>
  <br/>
  We are happy to have you on board!
  <br/>
  <br/>
Cheers,
<br/>
The Cardinal Torch Team </p> <br/>
  <br/><a href='${process.env.NEXTAUTH_URL}/unsubscribe'>Click here to unsubscribe</a>`;

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !emailRegex.test(email)) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter a valid email to be subscribed",
      },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const newSubscriber = new subscriberModel({
      email,
    });

    await newSubscriber.save();

    const subscribers = await subscriberModel
      .find({ status: "subscribed" })
      .select("email -_id")
      .sort({ subscribedAt: -1 });

    const csv = json2csv.parse(subscribers, { fields: ["email"] });

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

    const infoMailData = {
      from: { name: "Cardinal Torch", address: process.env.MAIL_USER },
      to: "info@cardinaltorch.com",
      subject: "New Subscriber",
      html: infoHtml(email),
      attachments: [
        {
          filename: "Subsribers-list.csv",
          content: csv,
        },
      ],
    };

    const subscriberMailData = {
      from: {
        name: "Cardinal Torch",
        address: process.env.MAIL_USER,
      },
      to: email,
      subject: "Thanks For Subscribing",
      html: subscriberHtml,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(infoMailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });

    await new Promise((resolve, reject) => {
      transporter.sendMail(subscriberMailData, (err, info) => {
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
      { success: true, message: "Email Subscribed" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    if (error.errorResponse && error.errorResponse.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Email already subscribed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Something went wrong somewhere" },
      { status: 500 }
    );
  }
}
