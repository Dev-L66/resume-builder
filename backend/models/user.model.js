import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    verificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationTokenExpiresAt: {
      type: Date,
    },
    resetPassswordToken: {
      type: String,
    },
    resetPasswordTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true, strict: true }
);

export const User = mongoose.model("User", userSchema);
