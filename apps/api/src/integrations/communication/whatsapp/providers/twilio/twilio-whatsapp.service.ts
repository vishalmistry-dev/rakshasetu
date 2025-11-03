// modules/shared/whatsapp/providers/twilioWhatsapp.service.ts
import { ENV } from "@/config";
import Twilio from "twilio";

const client = Twilio(ENV.TWILIO_ACCOUNT_SID, ENV.TWILIO_AUTH_TOKEN);

type WhatsAppTemplateVariables = Record<string, string | number>;

export const sendWhatsAppMessage = async (
    to: string,
    body: string
) => {
    try {
        const message = await client.messages.create({
            from: `whatsapp:${ENV.TWILIO_WHATSAPP_NUMBER}`, // your Twilio WhatsApp number
            to: `whatsapp:${to}`,
            body,
        });
        return message;
    } catch (error) {
        console.error("WhatsApp send error:", error);
        throw error;
    }
};

// Interactive template message (buttons, list, etc.)
export const sendInteractiveTemplate = async (
    to: string,
    templateName: string,
    variables: WhatsAppTemplateVariables
) => {
    try {
        // Replace variables in template
        let body = await loadWhatsAppTemplate(templateName, variables);
        const message = await client.messages.create({
            from: `whatsapp:${ENV.TWILIO_WHATSAPP_NUMBER}`,
            to: `whatsapp:${to}`,
            body,
        });
        return message;
    } catch (error) {
        console.error("WhatsApp template error:", error);
        throw error;
    }
};

// Load template helper
const loadWhatsAppTemplate = async (
    templateName: string,
    variables: WhatsAppTemplateVariables
) => {
    // Example: templates are stored in /templates folder as text or json
    const templatePath = `${__dirname}/../templates/${templateName}.txt`;
    const fs = await import("fs/promises");
    let template = await fs.readFile(templatePath, "utf-8");

    Object.entries(variables).forEach(([key, value]) => {
        template = template.replace(new RegExp(`{{${key}}}`, "g"), String(value));
    });

    return template;
};
