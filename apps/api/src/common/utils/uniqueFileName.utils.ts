import crypto from "crypto";
import path from "path";

/**
 * Generates a unique, safe filename for uploaded files.
 * Format: [timestamp]_[randomHex].[ext]
 *
 * @param originalName - Original file name from upload
 * @returns Unique filename string
 */
export const generateFileName = (originalName: string): string => {
    const timestamp = Date.now();
    const randomHex = crypto.randomBytes(4).toString("hex"); // 8 chars
    const ext = path.extname(originalName).toLowerCase();
    const baseName = path.basename(originalName, ext)
        .replace(/\s+/g, "_")       // Replace spaces with underscores
        .replace(/[^a-zA-Z0-9_-]/g, ""); // Remove special chars

    return `${timestamp}_${randomHex}_${baseName}${ext}`;
};
