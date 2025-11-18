import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";
import { promisify } from "util";
import path from "path";
import { ENV } from "@/config";
import { logger } from "@/common/utils";

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET,
});

const unlinkFile = promisify(fs.unlink);

export const uploadOnCloudinary = async (filePath: string, folder: string): Promise<UploadApiResponse | null> => {
    if (!filePath) return null;
    try {
        const ext = path.extname(filePath).toLowerCase();
        let resourceType: "image" | "video" | "raw" = "raw";
        if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)) resourceType = "image";
        else if ([".mp4", ".mov", ".avi", ".webm"].includes(ext)) resourceType = "video";

        const result = await cloudinary.uploader.upload(filePath, { resource_type: resourceType, folder });
        await unlinkFile(filePath); // delete local temp file
        return result;
    } catch (err) {
        if (fs.existsSync(filePath)) await unlinkFile(filePath);
        logger.error("Cloudinary upload error:", err);
        return null;
    }
};

export const deleteFromCloudinary = async (publicId: string) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (err) {
        logger.error("Cloudinary delete error:", err);
        throw err;
    }
};
