import { ENV } from '@/config'
import { loadEmailTemplate } from './email.helpers'
import { EmailOptions } from './email.types'
import { sendEmailNodemailer } from './providers/nodemailer/nodemailer.service'

/**
 * Centralized email sender
 * @param to - recipient email
 * @param templateName - template file name
 * @param variables - variables for template
 * @param subject - email subject
 * @param provider - optional provider override
 */
export async function sendEmail(
  to: string,
  templateName: string,
  variables: Record<string, any>,
  subject?: string,
  provider?: 'nodemailer' | 'sendgrid'
) {
  // Load HTML from template
  const html = await loadEmailTemplate(templateName, variables)

  const emailOptions: EmailOptions = {
    to,
    subject: subject || 'No Subject',
    html,
  }

  // Determine which provider to use
  const chosenProvider = provider || (ENV.NODE_ENV === 'development' ? 'nodemailer' : 'sendgrid')

  if (chosenProvider === 'nodemailer') {
    return sendEmailNodemailer(emailOptions)
  } else if (chosenProvider === 'sendgrid') {
    // return sendEmailSendGrid(emailOptions);
  } else {
    throw new Error(`Unknown email provider: ${chosenProvider}`)
  }
}
