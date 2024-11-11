import connectDB from "@lib/config/db";
import employeeModel from "@lib/models/employeeModel";
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

  if (user.user_type != "admin") {
    return NextResponse.json(
      { success: false, message: "Access Denied" },
      { status: 401 }
    );
  }

  const formData = await request.formData();

  let id = formData.get("id");
  let img = formData.get("img");
  let name = formData.get("name");
  let role = formData.get("role");
  let dept = formData.get("dept");
  let desc = formData.get("desc");

  const descLimit = 400;

  if (!name) {
    return NextResponse.json(
      {
        success: false,
        message: "Employee must have a name",
      },
      { status: 400 }
    );
  }

  if (!role) {
    return NextResponse.json(
      {
        success: false,
        message: "Employee must have a role",
      },
      { status: 400 }
    );
  }

  if (!desc || desc.length > descLimit) {
    return NextResponse.json(
      {
        success: false,
        message: `Employee must have a description under ${descLimit} characters`,
      },
      { status: 400 }
    );
  }

  if (!dept) {
    return NextResponse.json(
      {
        success: false,
        message: "Employee must be assigned to a department",
      },
      { status: 400 }
    );
  }

  try {
    if (!id) {
      if (!img || typeof img !== "object") {
        return NextResponse.json(
          { success: false, message: "Please give employee an Image" },
          { status: 400 }
        );
      }

      const utapi = new UTApi();
      const utRes = await utapi.uploadFiles([img]);
      img = utRes[0].data.url;
      const key = utRes[0].data.key;

      const employee = new employeeModel({
        img,
        img_key: key,
        name,
        role,
        desc,
        dept,
      });

      await connectDB();

      await employee.save();

      return NextResponse.json(
        { success: true, message: `${name} Added` },
        { status: 200 }
      );
    } else {
      if (typeof img === "object") {
        const utapi = new UTApi();
        const utRes = await utapi.uploadFiles([img]);
        img = utRes[0].data.url;
      }

      await employeeModel.findOneAndUpdate(
        { _id: id },
        {
          img,
          name,
          role,
          desc,
          dept,
        }
      );

      return NextResponse.json(
        { success: true, message: `${name} Updated` },
        { status: 200 }
      );
    }
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
