import { Router } from "express";
import { registerUserSchema } from "./user-auth.schema";
import { bodySchema, paramsSchema, validateRequest } from "@/common/utils";
import {
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  resendOtpSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  verifyOtpSchema,
} from "../../shared";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resendOtp,
  resetPassword,
  verifyEmail,
  verifyTwoFAOtp,
} from "./user-auth.controller";

const router = Router();

// ----------------------- Public Routes -----------------------
router.post(
  "/register",
  validateRequest(bodySchema(registerUserSchema)),
  registerUser
);

router.post("/login", validateRequest(bodySchema(loginSchema)), loginUser);
router.post("/refresh", validateRequest(bodySchema(refreshTokenSchema)));

router.post("/logout", logoutUser);

router.post(
  "/forgot-password",
  validateRequest(bodySchema(forgotPasswordSchema)),
  forgotPassword
);

router.post(
  "/reset-password/:token",
  validateRequest(
    bodySchema(resetPasswordSchema),
    paramsSchema(refreshTokenSchema)
  ),
  resetPassword
);

// ----------------------- 2FA / Verification -----------------------
router.post(
  "/verify-email",
  validateRequest(bodySchema(verifyEmailSchema)),
  verifyEmail
);
router.post(
  "/resend-otp",
  validateRequest(bodySchema(resendOtpSchema)),
  resendOtp
);

router.post(
  "/2fa/verify",
  validateRequest(bodySchema(verifyOtpSchema)),
  verifyTwoFAOtp
);

export default router;
