import { sendViaTwilio } from "./providers/twilio/twilio.service";
import { loadSmsTemplate } from "./sms.helpers";

type SmsProvider = "twilio"; // Extendable for future providers

export const sendSms = async (
    to: string,
    templateName: string,
    variables: Record<string, any>,
    provider: SmsProvider = "twilio"
) => {
    const message = await loadSmsTemplate(templateName, variables);

    switch (provider) {
        case "twilio":
        default:
            return sendViaTwilio(to, message);
    }
};
