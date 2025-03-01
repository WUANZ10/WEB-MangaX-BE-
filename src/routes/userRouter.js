import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import { authMiddleware, authUserMiddleware } from "../middlewares/authMiddleware.js";

router.get("/data-user",userController.getUser)
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/update-user", userController.updateUser);
router.delete("/deleteUser/:id", authMiddleware, userController.deleteUser);
router.get("/getAll", authMiddleware, userController.getAllUser);
router.post("/refreshToken", userController.refreshToken);


export default router;
