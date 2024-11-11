import connectDB from "@lib/config/db";
import activityModel from "@lib/models/activityModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    const activities = await activityModel
      .find()
      .sort({ createdAt: -1 })
      .limit(30)
      .populate(
        "author",
        "personal_info.first_name personal_info.last_name personal_info.profile_img -_id"
      );

    return NextResponse.json(
      {
        success: true,
        message: "Activities fetched successfully",
        data: activities,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "An Unexpected Error Has Occurred",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
