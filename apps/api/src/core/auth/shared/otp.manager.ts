import crypto from "crypto";
import { authenticator } from "otplib";
import { OTP_LENGTH } from "./auth.constants";

// Generate a 6-digit numeric OTP
export const generateOtp = (): string => {
  return Math.floor(
    10 ** (OTP_LENGTH - 1) + Math.random() * 9 * 10 ** (OTP_LENGTH - 1)
  ).toString();
};

// Generate a secret for 2FA TOTP
export const generateTwoFactorSecret = (label: string): string => {
  return authenticator.generateSecret();
};

// Verify a 2FA token using the secret
export const verifyTwoFactorToken = (
  token: string,
  secret: string
): boolean => {
  return authenticator.verify({ token, secret });
};

// Generate random token (for email verification, etc.)
export const generateRandomToken = (length = 32): string => {
  return crypto.randomBytes(length).toString("hex");
};
