import express from "express";
const router = express.Router();
import { createUser, loginUser } from "../controllers/userController.js";

router.post("/register", createUser);
router.post("/login", loginUser)

export default router;
