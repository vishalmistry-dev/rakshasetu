// src/common/utils/logger.ts
import winston from "winston";

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom log format for console
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

// Custom log format for files (no color codes)
const fileFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true })
    ),
    transports: [
        // Console logs (colorized)
        new winston.transports.Console({
            format: combine(colorize(), consoleFormat),
        }),
        // File logs (clean, no colors)
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: fileFormat,
        }),
        new winston.transports.File({
            filename: "logs/combined.log",
            format: fileFormat,
        }),
    ],
});
