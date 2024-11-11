import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    blog_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    banner: { type: String },
    banner_key: { type: String },
    desc: { type: String, maxlength: 200 },
    content: { type: [] },
    tags: { type: [String] },
    author: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    total_reads: { type: Number, default: 0 },
    draft: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "publishedAt" } }
);

const blogModel = mongoose.models.blogs || mongoose.model("blogs", blogSchema);

export default blogModel;
