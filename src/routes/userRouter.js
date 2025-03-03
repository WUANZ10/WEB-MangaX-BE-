import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import { authMiddleware, authUserMiddleware } from "../middlewares/authMiddleware.js";
import { validateLoginRequest, validateRegisterRequest } from "../middlewares/userMiddleware.js";

router.post("/register", validateRegisterRequest, userController.createUser);
router.post("/login", validateLoginRequest, userController.loginUser);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", authMiddleware, userController.deleteUser);
router.get("/getAll", authMiddleware, userController.getAllUser);
router.get("/detailedUser/:id", authUserMiddleware, userController.detailedUser);
router.post("/refreshToken", userController.refreshToken);


export default router;
