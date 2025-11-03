import { bodySchema, paramsSchema, validateRequest } from "@/common/utils";
import { Router } from "express";
import {
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  resendOtpSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "../../shared";
import {
  forgotPassword,
  loginAdmin,
  logoutAdmin,
  resendOtp,
  resetPassword,
  verifyEmail,
} from "./admin-auth.controller";

const router = Router();

router.post("/login", validateRequest(bodySchema(loginSchema)), loginAdmin);
router.post("/logout", logoutAdmin);
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

export default router;
