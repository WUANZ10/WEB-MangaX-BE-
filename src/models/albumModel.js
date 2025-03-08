import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    uploader_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    artist: { type: String, default: "", require: true },
    author: { type: String, default: "", require: true },
    tags: { type: [String], default: [] },
    description: { type: String, default: "" },
    cover_image: { type: String, default: "" },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
    created_at: { type: Date, default: Date.now },
    views: { type: Number, default: 0, require: true },
    favorites: { type: Number, default: 0, require: true },
    ratings: { type: Number, default: 5, require: true },
    status: { type: String, default: "ongoing" },
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumSchema);

export default Album;
