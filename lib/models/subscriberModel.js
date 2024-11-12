import mongoose, { Schema } from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    status: {
      type: String,
      enum: ["subscribed", "unsubscribed"],
      default: "subscribed",
    },
  },
  {
    timestamps: {
      createdAt: "subscribedAt",
    },
  }
);

const subscriberModel =
  mongoose.models.subscribers ||
  mongoose.model("subscribers", subscriberSchema);

export default subscriberModel;
