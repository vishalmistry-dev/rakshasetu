import { ENV } from "@/config";
import twilio from "twilio";

const client = twilio(ENV.TWILIO_ACCOUNT_SID, ENV.TWILIO_AUTH_TOKEN);

export const sendViaTwilio = async (to: string, message: string) => {
    return client.messages.create({
        body: message,
        from: ENV.TWILIO_PHONE_NUMBER,
        to,
    });
};
