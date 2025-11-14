import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { HandledError } from "./errorTypes";

export const handleJwtError = (err: any): HandledError | null => {
    if (err instanceof JsonWebTokenError) {
        return {
            type: "JWTError",
            message: "Invalid authentication token",
            errors: err.message,
            statusCode: 401,
        };
    }

    if (err instanceof TokenExpiredError) {
        return {
            type: "JWTError",
            message: "Authentication token expired",
            errors: err.message,
            statusCode: 401,
        };
    }

    return null;
};
