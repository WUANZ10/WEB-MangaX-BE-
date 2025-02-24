import mongoose from "mongoose";

const viewedSchema = new mongoose.Schema(
  {
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  story_id: { type: mongoose.Schema.Types.ObjectId, ref:"Comic"},
  last_viewed_time: { type: Date, default: Date.now },
}
);

const Viewed = mongoose.model("Viewed", viewedSchema, "Viewed");

export default Viewed;
