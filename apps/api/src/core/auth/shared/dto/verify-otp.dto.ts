// shared/dto/verify-otp.dto.ts
import { z } from "zod";

export const verifyOtpSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const resendOtpSchema = z.object({
  email: z.string().email(),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type ResendOtpInput = z.infer<typeof resendOtpSchema>;
