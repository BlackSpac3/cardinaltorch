import mongoose, { Schema } from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["img_del", "img_add", "blog_del", "blog_add"],
      required: true,
      lowercase: true,
    },
    author: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  },
  { timestamps: true }
);

const activityModel =
  mongoose.models.activities || mongoose.model("activities", activitySchema);

export default activityModel;
