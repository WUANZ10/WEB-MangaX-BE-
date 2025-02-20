import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    story_id: { type: String, required: true },
    time_added: { type: Date, default: Date.now },
    last_viewed_time: { type: Date, default: Date.now },
  }
);

const Favorite = mongoose.model("Favorite", favoriteSchema,"Favorite");

export default Favorite;