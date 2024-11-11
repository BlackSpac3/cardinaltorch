import connectDB from "@lib/config/db";
import employeeModel from "@lib/models/employeeModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { dept } = body;

  try {
    await connectDB();

    const employees = await employeeModel.find({ dept });

    return NextResponse.json(
      {
        success: true,
        message: "Employees retrieved successfully",
        data: employees,
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
