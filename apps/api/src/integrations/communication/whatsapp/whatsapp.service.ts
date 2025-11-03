// modules/shared/whatsapp/providers/twilio.service.ts
import { ENV } from "@/config";
import Twilio from "twilio";
import { ButtonsMessageVariables, interactiveButtons } from "./templates/interactiveButtons";
import { interactiveList, ListMessageVariables } from "./templates/interactiveList";
import { normalMessage, NormalMessageVariables } from "./templates/normalMessage";

const client = Twilio(ENV.TWILIO_ACCOUNT_SID, ENV.TWILIO_AUTH_TOKEN);


type WhatsAppTemplateName = "normal" | "buttons" | "list";

export const sendWhatsApp = async (
    to: string,
    templateName: WhatsAppTemplateName,
    variables: NormalMessageVariables | ButtonsMessageVariables | ListMessageVariables
) => {
    let messageBody;

    switch (templateName) {
        case "normal":
            messageBody = normalMessage(variables as NormalMessageVariables);
            break;

        case "buttons":
            messageBody = interactiveButtons(variables as ButtonsMessageVariables);
            break;

        case "list":
            messageBody = interactiveList(variables as ListMessageVariables);
            break;

        default:
            throw new Error("Invalid WhatsApp template");
    }

    const message = await client.messages.create({
        from: `whatsapp:${ENV.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${to}`,
        ...messageBody,
    });

    return message;
};
