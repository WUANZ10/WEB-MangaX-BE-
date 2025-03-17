import express from "express";
import multer from "multer";
import chapterController from "../controllers/chapterController.js";
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post(
  "/addChapter",
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "pages", maxCount: 12 },
  ]),
  chapterController.addChapterPage
);

export default router;
