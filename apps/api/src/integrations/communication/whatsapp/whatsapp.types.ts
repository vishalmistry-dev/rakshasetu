export type WhatsAppMessage =
  | { body: string }
  | { body: string; buttons: any[] }
  | { body: string; buttonText: string; sections: any[] }
