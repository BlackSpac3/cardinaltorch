import connectDB from "@lib/config/db";
import activityModel from "@lib/models/activityModel";
import imageModel from "@lib/models/imageModel";
import userModel from "@lib/models/userModel";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(request) {
  const descLimit = 150;

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

  const formData = await request.formData();

  const image = formData.get("image");
  const desc = formData.get("desc");

  if (!image || typeof image !== "object") {
    return NextResponse.json(
      {
        success: false,
        message: "Please add an image to be uploaded",
      },
      { status: 400 }
    );
  }

  if (!desc || desc.length > descLimit) {
    return NextResponse.json(
      {
        success: false,
        message: `Image must have a decription under ${descLimit} characters`,
      },
      { status: 400 }
    );
  }

  try {
    //uploading image
    const utapi = new UTApi();
    const utRes = await utapi.uploadFiles([image]);

    //asigning image url and key
    const imageURL = utRes[0].data.url;
    const key = utRes[0].data.key;

    //connecting to db
    await connectDB();

    //creating & saving image data
    const newImage = new imageModel({
      image: imageURL,
      key,
      desc,
      author: user.user_id,
    });

    await newImage.save();

    //updating user data
    await userModel.findOneAndUpdate(
      { _id: user.user_id },
      {
        $inc: { "account_info.total_images": 1 },
        $push: { images: newImage._id },
      }
    );

    //logging activity
    const activity = new activityModel({
      title: desc,
      type: "img_add",
      author: user.user_id,
    });

    await activity.save();

    return NextResponse.json(
      { success: true, message: "Image Uploaded" },
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
