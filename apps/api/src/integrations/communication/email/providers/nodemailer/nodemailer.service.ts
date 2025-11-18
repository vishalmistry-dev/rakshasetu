import { ENV } from '@/config'
import nodemailer from 'nodemailer'
import { EmailOptions } from '../../email.types'

const transporter = nodemailer.createTransport({
  host: ENV.SMTP_HOST,
  port: Number(ENV.SMTP_PORT),
  secure: Number(ENV.SMTP_PORT) === 465, // Fix: compare numbers
  auth: {
    user: ENV.SMTP_USER,
    pass: ENV.SMTP_PASSWORD,
  },
})

export const sendEmailNodemailer = async (options: EmailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: `"${ENV.EMAIL_FROM_NAME || 'Rakshasetu'}" <${ENV.DEFAULT_EMAIL_FROM}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })

    return info
  } catch (error) {
    console.error('Nodemailer Error:', error)
    throw error
  }
}
