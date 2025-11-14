import { CookieOptions } from "express";
import { ENV } from "./env";

const frontendDomain = ENV.FRONTEND_BASE_URI
    ? ENV.FRONTEND_BASE_URI.replace(/^https?:\/\//, "").split(":")[0]
    : undefined;

export const cookieOptions: CookieOptions = {
    httpOnly: true, // ✅ prevents client-side JS access
    secure: ENV.NODE_ENV === "production", // ✅ only send over HTTPS in prod
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    domain: ENV.NODE_ENV === "production" ? frontendDomain : undefined, // ✅ correct domain for prod
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
