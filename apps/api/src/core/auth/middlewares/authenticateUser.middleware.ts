// core/auth/middlewares/authenticateUser.middleware.ts
import { NextFunction, Response, Request } from "express";
import { AppError } from "@/common/errors";
import { verifyAccessToken } from "../shared/token.manager";
import { CookieUserType } from "@/common/types/common.types";
import { email } from "zod";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header or cookies
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies?.accessToken;

    if (!token) {
      throw new AppError("Unauthorized: Access token not provided", 401);
    }

    // Verify token
    const payload = verifyAccessToken(token);

    if (!payload || !payload.id) {
      throw new AppError("Unauthorized: Invalid token provided", 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id, email: payload.email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
        type: true,
      },
    });

    if (!user) {
      throw new AppError("Unauthorized: User not found", 401);
    }

    // Attach user payload to request
    req.user = user as CookieUserType;

    next();
  } catch (err: any) {
    next(new AppError(err.message || "User authentication failed", 401));
  }
};
