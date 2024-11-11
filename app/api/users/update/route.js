import connectDB from "@lib/config/db";
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

  const bioLimit = 150;

  const formdata = await request.formData();

  let first_name = formdata.get("first_name");
  let last_name = formdata.get("last_name");
  let profile_img = formdata.get("profile_img");
  let email = formdata.get("email");
  let bio = formdata.get("bio");
  let profile_img_key = "";
  let fileUpload;

  if (first_name.length < 2 || last_name.length < 2) {
    return NextResponse.json(
      {
        success: false,
        message: "Name cannot be less than 2 characters",
      },
      { status: 403 }
    );
  }

  if (bio.length > bioLimit) {
    return NextResponse.json({
      success: false,
      message: `Bio should not be more than ${bioLimit} characters`,
    });
  }

  const userData = await userModel.findById(user.user_id);

  const prev_pofile_img_key = userData.personal_info.profile_img_key;
  const utapi = new UTApi();

  if (profile_img === "default") {
    profile_img =
      "https://utfs.io/f/7wGKpe9yAmvsyZSYh6xikucFQWzwOeSRqNth9YvdAK53b84V";
    await utapi.deleteFiles(prev_pofile_img_key);
    profile_img_key = "";
  }

  if (typeof profile_img === "object") {
    const new_res = await utapi.uploadFiles([profile_img]);
    await utapi.deleteFiles(prev_pofile_img_key);
    fileUpload = true;
    profile_img = new_res[0].data.url;
    profile_img_key = new_res[0].data.key;
  }

  try {
    await connectDB();
    let updateObj;
    if (!fileUpload) {
      updateObj = {
        "personal_info.first_name": first_name,
        "personal_info.last_name": last_name,
        "personal_info.email": email,
        "personal_info.profile_img": profile_img,
        "personal_info.bio": bio,
      };
    } else {
      updateObj = {
        "personal_info.first_name": first_name,
        "personal_info.last_name": last_name,
        "personal_info.email": email,
        "personal_info.profile_img": profile_img,
        "personal_info.profile_img_key": profile_img_key,
        "personal_info.bio": bio,
      };
    }

    await userModel.findOneAndUpdate({ _id: user.user_id }, updateObj, {
      runValidators: true,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        data: {
          name: `${first_name} ${last_name}`,
          first_name,
          email,
          last_name,
          profile_img,
          bio,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already in use",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong somewhere",
      },
      { status: 500 }
    );
  }
}
