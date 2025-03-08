import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import {
  authMiddleware,
  authAdminMiddleware,
  authUserMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  validateLoginRequest,
  validateRegisterRequest,
} from "../middlewares/userMiddleware.js";

// Public routes (không cần xác thực)
router.post("/register", validateRegisterRequest, userController.createUser);
router.post("/login", validateLoginRequest, userController.loginUser);

// Protected routes (cần xác thực)
router.put(
  "/updateUser/:id",
  authMiddleware,
  authAdminMiddleware,
  userController.updateUser
);
router.delete(
  "/deleteUser/:id",
  authMiddleware,
  authAdminMiddleware,
  userController.deleteUser
);
router.get(
  "/getAll",
  authMiddleware,
  authAdminMiddleware,
  userController.getAllUser
);
router.get(
  "/detailedUser/:id",
  authUserMiddleware,
  userController.detailedUser
);
router.post("/refreshToken", authMiddleware, userController.refreshToken);

export default router;
