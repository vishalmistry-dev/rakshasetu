
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppErrorHandler";
import { logger } from "./logger.utils";

/**
 * Wraps async route handlers and automatically forwards errors
 * to the global error handler.
 */
type AsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const asyncHandler = (fn: AsyncFn) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err: any) => {
            logger.error("❌ AsyncHandler caught an error:", err);

            // If it's not an AppError, wrap it
            if (!(err instanceof AppError)) {
                const message = err?.message || "Internal Server Error";
                const statusCode = err?.statusCode || 500;
                return next(new AppError(message, statusCode, false));
            }

            // If it's already AppError, just forward
            next(err);
        });
    };
};
