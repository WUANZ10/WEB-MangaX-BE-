import express from "express";
import commentController from "../controllers/commentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateComment } from "../middleware/validate/ValidateComment";
const router = express.Router();

router.post('/getAllComment',commentController.getAllComment)
router.post('/createComment',authMiddleware,validateComment ,commentController.createComment)
router.post('/deleteComment',commentController.deleteComment)
export default router