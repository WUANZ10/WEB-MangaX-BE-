import express from "express";
import commentController from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateComment } from "../middleware/validate/ValidateComment.js";
const router = express.Router();

router.post("/getAllComment", commentController.getAllComment);
router.post(
  "/createComment",
  authMiddleware,
  validateComment,
  commentController.createComment
);
router.post("/deleteComment", authMiddleware, commentController.deleteComment);
export default router;
