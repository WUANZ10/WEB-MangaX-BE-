import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    story_id: { type: mongoose.Schema.Types.ObjectId, ref:"Comic"},
    time_added: { type: Date, default: Date.now },
    last_viewed_time: { type: Date, default: Date.now },
  },
  // { timestamps: true } có time_added rồi thì này bị thừa
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
