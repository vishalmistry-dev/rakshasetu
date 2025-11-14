import { ZodError } from "zod";
import { HandledError } from "./errorTypes";

export const handleZodError = (err: any): HandledError | null => {
    if (!(err instanceof ZodError)) return null;

    const formatted = err.issues.map(issue => ({
        field: issue.path.join("."),
        message: issue.message,
    }));

    return {
        type: "ValidationError",
        message: formatted.map(f => `${f.field}: ${f.message}`).join("; "),
        errors: formatted,
        statusCode: 400,
    };
};
