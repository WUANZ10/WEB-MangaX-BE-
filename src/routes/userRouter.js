import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import {
  authMiddleware,
  authAdminMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  validateLoginRequest,
  validateRegisterRequest,
} from "../middlewares/userMiddleware.js";
import {validatePasswordUpdate, validateUserUpdate} from '../middleware/validate/validateUserUpdate.js'


router.post("/data-user",userController.getUser)
router.post("/register", validateRegisterRequest, userController.createUser);
router.post("/login", validateLoginRequest, userController.loginUser);
router.put("/updateUser/:id",authMiddleware,validateUserUpdate,userController.updateUser);
router.delete("/deleteUser/:id",authMiddleware,authAdminMiddleware,userController.deleteUser);
router.get("/getAllUser",authMiddleware,authAdminMiddleware, userController.getAllUser);
router.post("/refreshToken", userController.refreshToken);
router.put("/change-pass/:id",authMiddleware,validatePasswordUpdate,userController.changePassUser)

export default router;
