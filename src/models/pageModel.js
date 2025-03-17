import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    chapter_id:{type:mongoose.Schema.Types.ObjectId,ref:'Chapter'},
    page_number: { type: String, required: true },
    image_data: { type: String, required: true },
  },
  // { timestamps: true } thừa không cần thiết
);

const Page = mongoose.model("Page", pageSchema);

export default Page;
