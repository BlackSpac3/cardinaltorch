"use server";

import jwt from "jsonwebtoken";
import blogModel from "@lib/models/blogModel";
import connectDB from "@lib/config/db";

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

<<<<<<< HEAD
=======
export const getLatestUserData = async (email) => {
  try {
    await connectDB();
    const user = await userModel
      .findOne({ "personal_info.email": email })
      .select(
        "-personal_info.password -updatedAt -blogs -__v -account_info.default_pass -account_info.email_validation_status -account_info.type "
      );

    if (!user) {
      return { success: false, message: "User Not Found" };
    }

    return {
      success: true,
      message: "User data retrieved",
      data: user.account_info,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Unable to retrieve data" };
  }
};

>>>>>>> 5535889d7685230de6613a38ef2fc04154cbffaf
export const getStaticBlogs = async () => {
  await connectDB();
  const blogs = await blogModel.find({ draft: false });

  return blogs;
};
