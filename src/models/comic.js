import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    user_id: { type: String, required: true },
    username: { type: String, required: true },
    content: { type: String, required: true }
  },
  { _id: false }
);

const ChapterSchema = new Schema(
  {
    chapter_name: { type: String, required: true },
    chapter_number: { type: String, default: '' },
    pages_list: {
      tags: [String],
      required: true,
      // validate: {
      //   validator: function (pages) {
      //     return Array.isArray(pages) && pages.length > 0 && pages[0].trim() !== '';
      //   },
      //   message: 'The first page is required in pages_list and cannot be empty.'
      // }
    }
  },
  { _id: false }
);

const comicSchema = new Schema({
  story_name: { type: String, required: true },
  artist: { type: String, required: true },
  tags: { type: [String], default: [] },
  description: { type: String, default: '' },
  story_image: { type: String, default: '' },
  chapter_list: { type: [ChapterSchema], default: [] },
  created_at: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  favorites: { type: Number, default: 0 },
  ratings: { type: Number, default: 0 },
  status: { type: Boolean, default: true },
  poster_id: { type: String, default: '' },
  comment: { type: [CommentSchema], default: [] }
});

export default model('Comic', comicSchema,'Comic');