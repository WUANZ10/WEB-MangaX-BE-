import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  sender_username: { type: String, required: true },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sender_role: { type: Number, required: true },
});

const Notification = mongoose.model("Notification", notificationSchema,"Notification");

export default Notification;
