import jwt, { SignOptions } from "jsonwebtoken";
import { AppError } from "@/common/errors";
import { ENV } from "@/config";
import { JWT_ACCESS_EXPIRY, JWT_REFRESH_EXPIRY } from "./auth.constants";

const ACCESS_TOKEN_SECRET = ENV.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET = ENV.REFRESH_TOKEN_SECRET || "refresh_secret";

// Use constants for expiry
const signOptions: SignOptions = { expiresIn: JWT_ACCESS_EXPIRY };
const refreshSignOptions: SignOptions = { expiresIn: JWT_REFRESH_EXPIRY };

// Generate JWT access token
export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET as jwt.Secret, signOptions);
};

// Verify JWT access token
export const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET as jwt.Secret);
  } catch (err) {
    throw new AppError("Invalid or expired access token", 401);
  }
};

// Generate JWT refresh token
export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(
    payload,
    REFRESH_TOKEN_SECRET as jwt.Secret,
    refreshSignOptions
  );
};

// Verify JWT refresh token
export const verifyRefreshToken = (token: string): any => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET as jwt.Secret);
  } catch (err) {
    throw new AppError("Invalid or expired refresh token", 401);
  }
};
