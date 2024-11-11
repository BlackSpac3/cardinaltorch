import { profile } from "console";
import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    personal_info: {
      profile_img: {
        type: String,
        default:
          "https://utfs.io/f/7wGKpe9yAmvsyZSYh6xikucFQWzwOeSRqNth9YvdAK53b84V",
      },
      profile_img_key: { type: String, default: "" },
      first_name: {
        type: String,
        required: true,
        lowercase: true,
        minlength: [3, "fullname must be 3 letters long"],
      },
      last_name: {
        type: String,
        required: true,
        lowercase: true,
        minlength: [3, "fullname must be 3 letters long"],
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      bio: {
        type: String,
        maxlength: [200, "Bio should not be more than 200"],
        default: "",
      },
      password: {
        type: String,
        required: true,
      },
    },
    account_info: {
      email_validation_status: {
        type: Boolean,
        default: false,
      },
      total_posts: {
        type: Number,
        default: 0,
      },
      total_reads: {
        type: Number,
        default: 0,
      },
      total_drafts: {
        type: Number,
        default: 0,
      },
      total_images: {
        type: Number,
        default: 0,
      },
      type: {
        type: String,
        default: "user",
        enum: ["admin", "user"],
        lowercase: true,
      },
      default_pass: { type: Boolean, default: true },
    },
    blogs: {
      type: [Schema.Types.ObjectId],
      ref: "blogs",
      default: [],
    },
    images: {
      type: [Schema.Types.ObjectId],
      ref: "images",
      default: [],
    },
    disabled: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;
