import express from "express";
const router = express.Router();
import multer from "multer";
import albumController from "../controllers/albumController.js";
import {
  authMiddleware,
  authUploaderMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  validateCreateAlbumRequest,
  validateUpdateAlbumRequest,
} from "../middlewares/albumMiddleware.js";

const upload = multer({ dest: "uploads/" });

router.post(
  "/createAlbum",
  authMiddleware,
  validateCreateAlbumRequest, upload.single("cover_image"),
  albumController.createAlbum
);

router.put(
  "/updateAlbum/:id",
  authMiddleware,
  authUploaderMiddleware,
  validateUpdateAlbumRequest,
  albumController.updateAlbum
);

router.get("/getAllAlbum", albumController.getAllAlbum);

router.get("/detailedAlbum/:id", albumController.detailedAlbum);

export default router;
