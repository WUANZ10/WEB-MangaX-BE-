import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    avatar: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    introduce: { type: String, default: "" },
    password: { type: String, required: true },
    date_created: { type: Date, default: Date.now },
    role: { type: Number, required: true, enum: [1, 2] },
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
