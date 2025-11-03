import { ENV } from '@/config'
import sgMail from '@sendgrid/mail'
import { EmailOptions } from '../../email.types'

// Only set API key if it exists
if (ENV.SENDGRID_API_KEY && ENV.SENDGRID_API_KEY !== 'optional') {
  sgMail.setApiKey(ENV.SENDGRID_API_KEY)
}

export const sendEmailSendGrid = async (options: EmailOptions) => {
  if (!ENV.SENDGRID_API_KEY || ENV.SENDGRID_API_KEY === 'optional') {
    throw new Error('SendGrid API key not configured')
  }

  if (!options.html && !options.text) {
    throw new Error('Email must have either html or text content')
  }

  try {
    const msg = {
      from: {
        email: ENV.DEFAULT_EMAIL_FROM,
        name: ENV.EMAIL_FROM_NAME || 'Rakshasetu',
      },
      to: options.to,
      subject: options.subject,
      html: options.html || '',
      text: options.text || '',
    }

    const response = await sgMail.send(msg)
    return response
  } catch (error) {
    console.error('SendGrid Error:', error)
    throw error
  }
}
