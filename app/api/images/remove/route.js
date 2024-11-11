import connectDB from "@lib/config/db";
import activityModel from "@lib/models/activityModel";
import imageModel from "@lib/models/imageModel";
import userModel from "@lib/models/userModel";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

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
  let { img_id } = body;
  try {
    await connectDB();
    const image = await imageModel.findOneAndDelete({ _id: img_id });

    const utApi = new UTApi();
    const utRes = await utApi.deleteFiles(image.key);

    await userModel.findOneAndUpdate(
      { _id: image.author },
      {
        $inc: { "account_info.total_images": -1 },
        $pull: { images: image._id },
      }
    );

    const activity = new activityModel({
      title: image.desc,
      type: "img_del",
      author: user.user_id,
    });

    await activity.save();

    return NextResponse.json(
      {
        success: true,
        message: "Image deleted",
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
