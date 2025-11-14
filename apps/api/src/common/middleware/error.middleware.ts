import { NextFunction, Request, Response } from "express";
import { handleAppError } from "../errors/appError";
import { handleAxiosError } from "../errors/axiosError";
import { handleJwtError } from "../errors/jwtError";
import { handleMulterError } from "../errors/multerError";
import { handlePrismaError } from "../errors/prismaError";
import { handleZodError } from "../errors/zodError";
import { logger } from "../utils/logger.utils";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    logger.error("❌ Global Error:", err);

    const handlers = [
        handleZodError,
        handlePrismaError,
        handleJwtError,
        handleAxiosError,
        handleMulterError,
        handleAppError,
    ];

    for (const handle of handlers) {
        const handled = handle(err);
        if (handled) {
            return res.status(handled.statusCode).json({
                success: false,
                ...handled,
            });
        }
    }

    return res.status(500).json({
        success: false,
        type: "ServerError",
        message: err.message || "Internal Server Error",
    });
};
