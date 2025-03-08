import express from "express";
const router = express.Router();
import albumController from "../controllers/albumController.js";
import {
  authMiddleware,
  authUploaderMiddleware,
} from "../middlewares/authMiddleware.js";

router.post("/createAlbum", authMiddleware, albumController.createAlbum);
router.put(
  "/updateAlbum/:id",
  authMiddleware,
  authUploaderMiddleware,
  albumController.updateAlbum
);

export default router;
