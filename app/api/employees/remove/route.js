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

  if (user.user_type !== "admin") {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { id } = body;

  try {
    //connect to database
    await connectDB();

    const employee = await employeeModel.findOneAndDelete({ _id: id });

    const utapi = new UTApi();
    await utapi.deleteFiles(employee.img_key);

    return NextResponse.json(
      {
        success: true,
        message: `${employee.name} removed`,
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
