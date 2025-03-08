import mongoose from "mongoose";

const viewedSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    album_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
    time_added: { type: Date, default: Date.now },
    last_viewed_time: { type: Date, default: Date.now },
  },
  // { timestamps: true } thêm time_added vào cho giống favourite
);

const Viewed = mongoose.model("Viewed", viewedSchema);

export default Viewed;
