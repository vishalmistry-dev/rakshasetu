// src/common/middleware/notFound.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
    // Create a 404 AppError and pass to the error handler
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
};
