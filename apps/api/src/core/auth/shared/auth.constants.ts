// shared/auth.constants.ts

import { ENV } from "@/config";
import { SignOptions } from "jsonwebtoken";

export const JWT_ACCESS_EXPIRY = (ENV.ACCESS_TOKEN_EXPIRY ||
  "1d") as SignOptions["expiresIn"];
export const JWT_REFRESH_EXPIRY = (ENV.REFRESH_TOKEN_EXPIRY ||
  "7d") as SignOptions["expiresIn"];

export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 10;

export const PASSWORD_SALT_ROUNDS = 10;

export const TWO_FA_ISSUER = "MyApp";
