export interface JwtPayload {
  id: string;
  email: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  role?: "USER" | "MERCHANT";
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  requires2FA?: boolean;
}

export interface TwoFAVerifyResponse {
  success: boolean;
  message: string;
}

export type UserRole = "USER" | "MERCHANT";
