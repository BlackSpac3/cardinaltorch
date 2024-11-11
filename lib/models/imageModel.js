import mongoose, { Schema } from "mongoose";
import { type } from "os";

const imageSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    key: { type: String, required: true },
    desc: { type: String, required: true, maxlength: 150 },
    author: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  },
  { timestamps: { createdAt: "uploadedAt" } }
);

const imageModel =
  mongoose.models.images || mongoose.model("images", imageSchema);

export default imageModel;
