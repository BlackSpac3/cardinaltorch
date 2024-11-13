import connectDB from "@lib/config/db";
import employeeModel from "@lib/models/employeeModel";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(request) {
  // confirm session
  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!user) {
    console.log("User not in session");
    return NextResponse.json(
      { success: false, message: "Access Denied" },
      { status: 401 }
    );
  }

  //confirm admin access
  if (user.user_type != "admin") {
    console.log("Unauthorized User Access");
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
    await connectDB();
    const utapi = new UTApi();
    if (!id) {
      //creating new employee
      console.log("creating new employee...");

      if (!img || typeof img !== "object") {
        return NextResponse.json(
          { success: false, message: "Please give employee an Image" },
          { status: 400 }
        );
      }

      //uploading employee image
      console.log("uploading employee image...");

      const utRes = await utapi.uploadFiles([img]);

      console.log("image uploaded");
      //assigning image data
      img = utRes[0].data.url;
      const key = utRes[0].data.key;

      //saving employee
      const employee = new employeeModel({
        img,
        img_key: key,
        name,
        role,
        desc,
        dept,
      });

      await employee.save();

      console.log("employee created!");

      return NextResponse.json(
        { success: true, message: `${name} Added` },
        { status: 200 }
      );
    } else {
      //updating employee data
      console.log("updating employee data");

      let updateObject = {};

      if (typeof img === "object") {
        //deleting previous emplpoyee image
        console.log("retriebing previous employee image");

        const data = await employeeModel.findById(id);
        const prev_key = data.img_key;

        console.log("deleting previous employee image");
        await utapi.deleteFiles([prev_key]);

        //uploading new employee image
        console.log("uploading new employee image");

        const utRes = await utapi.uploadFiles([img]);

        //assingning new image data
        img = utRes[0].data.url;
        const key = utRes[0].data.key;

        updateObject = { img, img_key: key, name, role, desc, dept };
      } else {
        updateObject = { img, name, role, desc, dept };
      }

      //updating employee
      console.log("updating employee");

      await employeeModel.findByIdAndUpdate(id, updateObject);

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
