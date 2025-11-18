// core/auth/auth.service.ts
import {
  TWO_FA_ISSUER,
  JWT_ACCESS_EXPIRY,
  JWT_REFRESH_EXPIRY,
  OTP_EXPIRY_MINUTES,
  OTP_LENGTH,
  PASSWORD_SALT_ROUNDS,
} from "./shared/auth.constants";
import {
  generateOtp,
  generateTwoFactorSecret,
  verifyTwoFactorToken,
} from "./shared/otp.manager";
import { comparePasswords, hashPassword } from "./shared/password.manager";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./shared/token.manager";

export const AuthService = {
  // Password hashing
  hashPassword,
  comparePasswords,

  // JWT token generation & verification
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,

  // 2FA helpers
  generateTwoFactorSecret,
  verifyTwoFactorToken,

  // OTP helpers
  generateOtp,

  TWO_FA_ISSUER,
  JWT_ACCESS_EXPIRY,
  JWT_REFRESH_EXPIRY,
  OTP_EXPIRY_MINUTES,
  OTP_LENGTH,
  PASSWORD_SALT_ROUNDS,
};
