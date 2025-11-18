
import { Response } from "express";

interface Meta {
    total?: number;
    page?: number;
    limit?: number;
    [key: string]: any;
}

interface ResponseOptions<T = any> {
    statusCode?: number;
    success?: boolean;
    message?: string;
    data?: T | null;
    meta?: Meta | null;
    errors?: any; // for failed responses (optional)
}

/**
 * Unified API Response Handler
 * Used for sending both success and error responses in a consistent format.
 */
export const sendResponse = <T>(res: Response, options: ResponseOptions<T>) => {
    const {
        statusCode = 200,
        success = true,
        message = success ? "Success" : "Error",
        data = null,
        meta = null,
        errors = null,
    } = options;

    const responseBody: Record<string, any> = {
        success,
        message,
    };

    if (data !== null) responseBody.data = data;
    if (meta) responseBody.meta = meta;
    if (!success && errors) responseBody.errors = errors;

    return res.status(statusCode).json(responseBody);
};
