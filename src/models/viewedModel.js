import mongoose from "mongoose";

const viewedSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  story_id: { type: String, required: true },
  last_viewed_time: { type: Date, default: Date.now },
});

const Viewed = mongoose.model("Viewed", viewedSchema);

export default Viewed;
