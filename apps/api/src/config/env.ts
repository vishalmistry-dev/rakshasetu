import { logger } from '@/common/utils'
import dotenv from 'dotenv'
import path from 'path'
import { z } from 'zod'

// Load .env from monorepo root (tsx doesn't support __dirname properly)
const envPath = path.resolve(process.cwd(), '../../.env')
const result = dotenv.config({ path: envPath })

if (result.error) {
  console.error('❌ Failed to load .env file:', result.error)
  process.exit(1)
}

const durationRegex = /^[0-9]+[smhd]$/

const urlSchema = z
  .string()
  .url()
  .refine((val) => val.startsWith('http://') || val.startsWith('https://'), {
    message: 'FRONTEND_BASE_URI must start with http:// or https://',
  })

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('4000'),
  LOG_LEVEL: z.string().optional(),
  CORS_ORIGIN: z.string().min(1),

  DATABASE_URL: z.string().url(),

  FRONTEND_BASE_URI: urlSchema,

  ACCESS_TOKEN_SECRET: z
    .string()
    .min(10, 'ACCESS_TOKEN_SECRET must be at least 10 characters long'),
  ACCESS_TOKEN_EXPIRY: z
    .string()
    .regex(durationRegex, 'ACCESS_TOKEN_EXPIRY must be in format like 15m, 1h, 7d'),

  REFRESH_TOKEN_SECRET: z
    .string()
    .min(10, 'REFRESH_TOKEN_SECRET must be at least 10 characters long'),
  REFRESH_TOKEN_EXPIRY: z
    .string()
    .regex(durationRegex, 'REFRESH_TOKEN_EXPIRY must be in format like 15m, 1h, 7d'),

  CLOUDINARY_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_SECURE: z.boolean().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),

  SENDGRID_API_KEY: z.string().optional(),

  DEFAULT_EMAIL_FROM: z.string().email(),
  EMAIL_REPLY_TO: z.string().email().optional(),
  EMAIL_FROM_NAME: z.string().optional(),
  EMAIL_TEMPLATES_PATH: z.string().optional(),

  TWILIO_ACCOUNT_SID: z.string().min(1),
  TWILIO_AUTH_TOKEN: z.string().min(1),
  TWILIO_PHONE_NUMBER: z.string().min(1),
  TWILIO_WHATSAPP_NUMBER: z.string().min(1),

  SHOPIFY_API_KEY: z.string().min(1),
  SHOPIFY_API_SECRET: z.string().min(1),
  SHOPIFY_SCOPES: z.string().min(1),
  SHOPIFY_APP_URL: z.string().url(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  logger.error('❌ Invalid environment variables:', parsed.error)
  process.exit(1)
}

export const ENV = parsed.data
