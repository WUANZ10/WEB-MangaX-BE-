import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    album_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
    chapter_cover: { type: String, required: false },
    chapter_name: { type: String, required: true },
    chapter_number: { type: Number, require: true },
    pages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Page" }],
  },
  { timestamps: true }
);

const Chapter = mongoose.model("Chapter", chapterSchema);

export default Chapter;
