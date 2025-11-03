import { AppError } from '@/common/errors'
import { asyncHandler } from '@/common/utils'
import { validateHmac } from '../helpers/hmac-validator'
import * as oauthService from './oauth.service'

/**
 * Start OAuth flow
 * GET /api/shopify/oauth?shop=store.myshopify.com
 */
export const startOAuth = asyncHandler(async (req, res) => {
  const { shop } = req.query

  if (!shop || typeof shop !== 'string') {
    throw new AppError('Shop parameter is required', 400)
  }

  // Validate HMAC if present
  if (req.query.hmac) {
    const isValid = validateHmac(req.query as Record<string, any>)
    if (!isValid) {
      throw new AppError('Invalid HMAC signature', 401)
    }
  }

  // Get authorization URL
  const authUrl = await oauthService.getAuthUrl(shop)

  // Redirect to Shopify authorization page
  res.redirect(authUrl)
})

/**
 * Handle OAuth callback
 * GET /api/shopify/oauth/callback?code=xxx&shop=xxx&state=xxx
 */
export const handleCallback = asyncHandler(async (req, res) => {
  const { shop, code, state } = req.query

  if (!shop || !code || !state) {
    throw new AppError('Missing required parameters', 400)
  }

  // Validate HMAC
  const isValid = validateHmac(req.query as Record<string, any>)
  if (!isValid) {
    throw new AppError('Invalid HMAC signature', 401)
  }

  // Process callback
  const result = await oauthService.handleCallback(shop as string, code as string, state as string)

  // Redirect to app dashboard
  const appUrl = `https://${shop}/admin/apps/${process.env.SHOPIFY_APP_HANDLE || 'rakshasetu'}`

  res.redirect(appUrl)
})
