import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    album_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    },
    chapter_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Chapter",
    },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
