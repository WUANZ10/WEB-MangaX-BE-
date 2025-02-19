import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController.js";

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/update-user/:id", userController.updateUser);

export default router;


