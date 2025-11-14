import multer from "multer";
import { HandledError } from "./errorTypes";

export const handleMulterError = (err: any): HandledError | null => {
    if (!(err instanceof multer.MulterError)) return null;

    return {
        type: "FileUploadError",
        message: err.message || "File upload failed",
        errors: err.code,
        statusCode: 400,
    };
};
