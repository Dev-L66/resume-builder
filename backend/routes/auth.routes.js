import express from "express";
import {
    checkAuthController,
  forgotPasswordController,
  loginController,
  resendVerificationController,
  resetPasswordController,
  signUpController,
  verifyEmailController,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/check-auth', authMiddleware, checkAuthController);
router.post("/signup", signUpController);
router.get("/verify-email", verifyEmailController);
router.post("/resend-verification", resendVerificationController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

export default router;
