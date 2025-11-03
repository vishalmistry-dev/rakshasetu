import { ENV } from "@/config";
import sgMail from "@sendgrid/mail";
import { EmailOptions } from "../../email.types";

sgMail.setApiKey(ENV.SENDGRID_API_KEY);

/**
 * Send an email using SendGrid
 */
export const sendEmailSendGrid = async (options: EmailOptions) => {
    try {
        const msg = {
            from: {
                email: ENV.DEFAULT_EMAIL_FROM,
                name: ENV.EMAIL_FROM_NAME,
            },
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
        };

        const response = await sgMail.send(msg);
        return response;
    } catch (error) {
        console.error("SendGrid Error:", error);
        throw error;
    }
};
