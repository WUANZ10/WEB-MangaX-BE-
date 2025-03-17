import fs from "fs";
import { uploadImage, uploadMultiImage } from "../services/uploadService.js";
import Chapter from "../models/chapterModel.js";
import Page from "../models/pageModel.js";
import Album from "../models/albumModel.js";

const chapterController = {
  addChapterPage: async (req, res) => {
    try {
      //tạo chapter - page
      const { album_id, chapter_name, chapter_number } = req.body;
      const coverImage = req.files.cover_image ? req.files.cover_image[0] : null;
      const pageFiles = req.files.pages || [];
      const findAlbum = await Album.findOne({ _id: album_id });
      if (!findAlbum) {
        return res.status(404).send({
          message: "ko tìm thấy album để upload",
        });
      }
      if (!coverImage || pageFiles.length === 0) {
        return res.status(400).send({
          message: "Thiếu ảnh cover hoặc trang chapter",
        });
      }
      const chapterCoverUrl = await uploadImage(coverImage, "MangaX/Covers");
      const uploadedPages = await uploadMultiImage(pageFiles, "MangaX/Pages");

      //   page
      const pages = await Page.insertMany(
        uploadedPages.map((page) => ({
          chapter_id: null,
          page_number: page.page_number,
          image_data: page.image_url,
        }))
      );
      // chapter
      const newChapter = new Chapter({
        album_id,
        chapter_cover: chapterCoverUrl,
        chapter_name,
        chapter_number,
        pages: pages.map((page) => page._id),
      });
      await newChapter.save();
      await Page.updateMany(
        { _id: { $in: pages.map((p) => p._id) } },
        { chapter_id: newChapter._id }
      );
      await Album.findByIdAndUpdate(album_id, { $push: { chapters: newChapter._id } });
      res.status(200).send({
        message: "upload chapter/page done",
        data: newChapter,
      });
    } catch (err) {
      res.serverErorr({ err });
    }
  },
};
export default chapterController;
