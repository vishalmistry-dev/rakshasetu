import { Router } from "express";
import { registerMerchantSchema } from "./merchant-auth.schema";
import { bodySchema, validateRequest } from "@/common/utils";
import {
  loginSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "../../shared";
import { registerMerchant } from "./merchant-auth.controller";

const router = Router();
// ----------------------- Public Routes -----------------------
router.post(
  "/register",
  validateRequest(bodySchema(registerMerchantSchema)),
  registerMerchant
);
router.post("/login", validateRequest(bodySchema(loginSchema)));
router.post("/forgot-password");
router.post(
  "/reset-password/:token",
  validateRequest(bodySchema(resetPasswordSchema))
);
router.post("/logout");

// ----------------------- Verification / 2FA -----------------------
router.post("/verify-email", validateRequest(bodySchema(verifyEmailSchema)));
router.post("/resend-otp");
router.post("/2fa/verify");

export default router;
