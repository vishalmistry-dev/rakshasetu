import { AppError } from '@/common/errors'
import { NextFunction, Request, Response } from 'express'
import { validateWebhookHmac } from '../helpers/hmac-validator'

/**
 * Validates Shopify webhook HMAC
 * IMPORTANT: Must use raw body, not parsed JSON
 */
export const validateShopifyWebhook = (req: Request, res: Response, next: NextFunction) => {
  const hmac = req.get('X-Shopify-Hmac-Sha256')

  if (!hmac) {
    throw new AppError('Missing HMAC header', 401)
  }

  // Get raw body (you'll need to configure express to preserve it)
  const rawBody = (req as any).rawBody || JSON.stringify(req.body)

  const isValid = validateWebhookHmac(rawBody, hmac)

  if (!isValid) {
    throw new AppError('Invalid webhook signature', 401)
  }

  next()
}
