import { ENV } from "@/config";
import nodemailer from "nodemailer";
import { EmailOptions } from "../../email.types";

// Create transporter
const transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: Number(ENV.SMTP_PORT),
    secure: ENV.SMTP_PORT === "465", // true for 465, false for other ports
    auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASSWORD,
    },
});

/**
 * Send an email using Nodemailer
 */
export const sendEmailNodemailer = async (options: EmailOptions) => {
    try {
        const info = await transporter.sendMail({
            from: `"${ENV.EMAIL_FROM_NAME}" <${ENV.DEFAULT_EMAIL_FROM}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
        });

        return info;
    } catch (error) {
        console.error("Nodemailer Error:", error);
        throw error;
    }
};
