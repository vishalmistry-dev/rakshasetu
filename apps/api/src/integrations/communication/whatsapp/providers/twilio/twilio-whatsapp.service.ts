import { ENV } from '@/config'
import Twilio from 'twilio'
import { ButtonsMessageVariables, interactiveButtons } from '../../templates/interactiveButtons'
import { interactiveList, ListMessageVariables } from '../../templates/interactiveList'
import { normalMessage, NormalMessageVariables } from '../../templates/normalMessage'

const client = Twilio(ENV.TWILIO_ACCOUNT_SID, ENV.TWILIO_AUTH_TOKEN)

// Simple text message
export const sendWhatsAppViaTwilio = async (to: string, body: string) => {
  try {
    const message = await client.messages.create({
      from: `whatsapp:${ENV.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
      body,
    })
    return message
  } catch (error) {
    console.error('WhatsApp send error:', error)
    throw error
  }
}

// Interactive messages (buttons/lists)
type TemplateName = 'normal' | 'buttons' | 'list'
type TemplateVariables = NormalMessageVariables | ButtonsMessageVariables | ListMessageVariables

export const sendWhatsAppTemplate = async (
  to: string,
  templateName: TemplateName,
  variables: TemplateVariables
) => {
  let messageBody

  switch (templateName) {
    case 'normal':
      messageBody = normalMessage(variables as NormalMessageVariables)
      break
    case 'buttons':
      messageBody = interactiveButtons(variables as ButtonsMessageVariables)
      break
    case 'list':
      messageBody = interactiveList(variables as ListMessageVariables)
      break
    default:
      throw new Error('Invalid WhatsApp template')
  }

  try {
    const message = await client.messages.create({
      from: `whatsapp:${ENV.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
      ...messageBody,
    })
    return message
  } catch (error) {
    console.error('WhatsApp template error:', error)
    throw error
  }
}
