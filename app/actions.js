"use server";

import jwt from "jsonwebtoken";
import blogModel from "@lib/models/blogModel";
import connectDB from "@lib/config/db";
import { revalidatePath } from "next/cache";

export const verifyResetPassToken = async (token) => {
  if (!token) {
    return { success: false, message: "No token" };
  }

  const jwtHandler = (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return { success: false, message: "Expired Token", user: null };
      }
      return { success: false, message: "Invalid Token", user: null };
    }

    return { success: true, message: "Token Valid", user: user.id };
  };

  const resposne = jwt.verify(token, process.env.NEXTAUTH_SECRET, jwtHandler);

  return resposne;
};

export const getStaticBlogs = async () => {
  await connectDB();
  const blogs = await blogModel.find({ draft: false });

  return blogs;
};

export const revalidateBlogs = () => {
  revalidatePath("/blogs/[blog_id]", "page");
  revalidatePath("/blogs");
};
