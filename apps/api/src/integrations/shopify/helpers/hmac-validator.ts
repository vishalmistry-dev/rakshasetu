import { ENV } from '@/config'
import crypto from 'crypto'

/**
 * Validates Shopify HMAC signature
 */
export const validateHmac = (query: Record<string, any>): boolean => {
  const { hmac, ...params } = query

  if (!hmac) return false

  // Build message string
  const message = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&')

  // Generate HMAC
  const generatedHmac = crypto
    .createHmac('sha256', ENV.SHOPIFY_API_SECRET || '')
    .update(message)
    .digest('hex')

  return crypto.timingSafeEqual(Buffer.from(generatedHmac), Buffer.from(hmac as string))
}

/**
 * Validates webhook HMAC from header
 */
export const validateWebhookHmac = (body: string, hmacHeader: string): boolean => {
  const generatedHmac = crypto
    .createHmac('sha256', ENV.SHOPIFY_API_SECRET || '')
    .update(body, 'utf8')
    .digest('base64')

  return crypto.timingSafeEqual(Buffer.from(generatedHmac), Buffer.from(hmacHeader))
}
