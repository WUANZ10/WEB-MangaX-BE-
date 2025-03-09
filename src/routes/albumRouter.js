import express from "express";
const router = express.Router();
import albumController from "../controllers/albumController.js";
import {
  authMiddleware,
  authUploaderMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  validateCreateAlbumRequest,
  validateUpdateAlbumRequest,
} from "../middlewares/albumMiddleware.js";

router.post(
  "/createAlbum",
  authMiddleware,
  validateCreateAlbumRequest,
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
