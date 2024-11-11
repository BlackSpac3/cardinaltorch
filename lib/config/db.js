import userModel from "@lib/models/userModel";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already Connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI, { autoIndex: true }).then(() => {
      console.log("Connected");
      userModel.countDocuments({}).then(async (count) => {
        if (count < 1) {
          const salt = await bcrypt.genSalt(10);
          const encryptedPass = await bcrypt.hash("Admin1@Supra", salt);

          const newUser = new userModel({
            personal_info: {
              first_name: "Admin",
              last_name: "Admin",
              email: "Admin@Supra.com",
              password: encryptedPass,
            },
            account_info: {
              type: "admin",
              default_pass: false,
            },
          });

          newUser
            .save()
            .then((user) => {
              console.log(
                "__________________________________________________________________"
              );
              console.log("SERVER INITIALIZED");
              console.log(
                "__________________________________________________________________"
              );
            })
            .catch((err) => console.log(err));
        }
      });
    });
  } catch (error) {
    console.log("Error in connecting to database", error);
    throw new Error("Error connecting to database");
  }
};

export default connectDB;
