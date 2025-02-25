import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    introduce: { type: String, default: "" },
    date_created: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false, required: true },
    access_token: { type: String, required: false },
    refresh_token: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
