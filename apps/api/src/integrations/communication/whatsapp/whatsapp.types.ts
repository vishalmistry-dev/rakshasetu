// modules/shared/whatsapp/whatsapp.types.ts
export type WhatsAppMessage =
    | { body: string }                       // normal text
    | { body: string; buttons: any[] }       // interactive buttons
    | { body: string; buttonText: string; sections: any[] }; // interactive list


export interface WhatsAppTemplateMessage {
    to: string;
    templateName: string;
    variables: Record<string, string | number>;
}

