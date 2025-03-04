import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    album_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
    chapter_name: { type: String, required: true },
    description: { type: String, default: "" },
    pages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Page" }],
  },
  { timestamps: true }
);

const Chapter = mongoose.model("Chapter", chapterSchema);

export default Chapter;
