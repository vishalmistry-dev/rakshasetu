export interface EmailOptions {
    to: string | string[];      // single or multiple recipients
    subject: string;
    text?: string;              // plain text version
    html?: string;              // HTML version
    attachments?: Array<{
        filename: string;
        path?: string;
        content?: Buffer | string;
    }>;
}
