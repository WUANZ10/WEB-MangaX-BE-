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
    last_viewed_time: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Viewed = mongoose.model("Viewed", viewedSchema);

export default Viewed;
