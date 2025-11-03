import { sendWhatsAppViaTwilio } from './providers/twilio/twilio-whatsapp.service'

type WhatsAppProvider = 'twilio'

export const sendWhatsApp = async (
  to: string,
  body: string,
  provider: WhatsAppProvider = 'twilio'
) => {
  switch (provider) {
    case 'twilio':
    default:
      return sendWhatsAppViaTwilio(to, body)
  }
}
