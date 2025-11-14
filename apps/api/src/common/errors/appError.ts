import { AppError } from "./AppErrorHandler";
import { HandledError } from "./errorTypes";

export const handleAppError = (err: any): HandledError | null => {
    if (!(err instanceof AppError)) return null;

    return {
        type: "AppError",
        message: err.message,
        statusCode: err.statusCode || 400,
    };
};
