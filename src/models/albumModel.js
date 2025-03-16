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
    views: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
    ratings: { type: Number, default: 0 },
    status: { type: Boolean,default:true }, // đổi lại Boolean xét true false 
  },
  // { timestamps: true } có create_at rồi thêm timestamps nhìn thừa
);

const Album = mongoose.model("Album", albumSchema);

export default Album;
