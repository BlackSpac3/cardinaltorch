import mongoose, { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    img_key: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    desc: {
      type: String,
      required: true,
      maxlength: [400, "Description should not be more than 400"],
    },
    dept: {
      type: String,
      required: true,
      enum: ["board", "management"],
      lowercase: true,
    },
  },
  { timestamps: true }
);

const employeeModel =
  mongoose.models.employees || mongoose.model("employees", employeeSchema);

export default employeeModel;
