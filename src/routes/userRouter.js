import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";

router.get("/data-user",userController.getUser)
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
// router.put("/update-user/:id", userController.updateUser);
router.put("/update-user", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);
export default router;
