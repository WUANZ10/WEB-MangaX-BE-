import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import { authMiddleware, authUserMiddleware } from "../middlewares/authMiddleware.js";
import { validateUpdate } from "../middleware/validate/validateUpdate.js";

router.post("/data-user",userController.getUser)
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/change-pass",userController.changePassUser)
router.put("/update-user",validateUpdate, userController.updateUser);
router.delete("/deleteUser/:id", authMiddleware, userController.deleteUser);
router.get("/getAll", authMiddleware, userController.getAllUser);
router.post("/refreshToken", userController.refreshToken);


export default router;
