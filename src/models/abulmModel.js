import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Tham chiếu đến User (người đăng)
    tags: { type: [String], default: [] },
    description: { type: String, default: "" },
    cover_image: { type: String, default: "" },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
    created_at: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
    ratings: { type: Number, default: 0 },
    status: { type: String, default: "ongoing" },
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumSchema);

export default Album;
