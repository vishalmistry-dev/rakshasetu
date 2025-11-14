import { AppError } from '@/common/errors'
import { generateUniqueId, logger } from '@/common/utils'
import { ENV } from '@/config'
import { prisma } from '@/config/prisma'
import { generateRefreshToken } from '@/core/auth/shared/token.manager'
import { registerWebhooks } from '@/integrations/shopify/helpers/webhook-registry'
import axios from 'axios'
import crypto from 'crypto'

const SHOPIFY_API_KEY = ENV.SHOPIFY_API_KEY
const SHOPIFY_API_SECRET = ENV.SHOPIFY_API_SECRET
const SHOPIFY_SCOPES = ENV.SHOPIFY_SCOPES
const SHOPIFY_APP_URL = ENV.SHOPIFY_APP_URL

/**
 * Generate OAuth authorization URL
 */
export const getAuthUrl = async (shop: string): Promise<string> => {
  // Validate shop format

  shop = shop
    .replace(/^https?:\/\//, '') // ✅ Remove http:// or https://
    .replace(/\/$/, '')

  if (!shop.includes('.myshopify.com')) {
    shop = `${shop}.myshopify.com`
  }

  // Generate state token for security
  const state = crypto.randomBytes(32).toString('hex')

  // Store state in database temporarily
  await prisma.shopifyState.create({
    data: {
      id: await generateUniqueId('sst', 'shopifyState'),
      shopUrl: shop,
      state,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    },
  })

  // Build authorization URL
  const authUrl =
    `https://${shop}/admin/oauth/authorize?` +
    `client_id=${SHOPIFY_API_KEY}&` +
    `scope=${SHOPIFY_SCOPES}&` +
    `redirect_uri=${SHOPIFY_APP_URL}/api/integrations/shopify/oauth/callback&` + // ✅ Updated path
    `state=${state}`

  return authUrl
}

/**
 * Handle OAuth callback and create merchant
 */
export const handleCallback = async (
  shop: string,
  code: string,
  state: string
): Promise<{ merchantId: string; storeId: string; isNewInstall: boolean }> => {
  // Validate state
  const stateRecord = await prisma.shopifyState.findUnique({
    where: { state },
  })

  if (!stateRecord || stateRecord.shopUrl !== shop) {
    throw new AppError('Invalid state parameter', 400)
  }

  if (new Date() > stateRecord.expiresAt) {
    throw new AppError('State expired. Please try again.', 400)
  }

  // Exchange code for access token
  const tokenResponse = await axios.post(`https://${shop}/admin/oauth/access_token`, {
    client_id: SHOPIFY_API_KEY,
    client_secret: SHOPIFY_API_SECRET,
    code,
  })

  const { access_token, scope } = tokenResponse.data

  // Get shop details
  const shopResponse = await axios.get(`https://${shop}/admin/api/2024-10/shop.json`, {
    headers: {
      'X-Shopify-Access-Token': access_token,
    },
  })

  const shopData = shopResponse.data.shop

  // Check if merchant exists
  let merchant = await prisma.merchant.findUnique({
    where: { email: shopData.email },
  })

  let isNewInstall = false

  if (!merchant) {
    // Create new merchant
    const merchantId = await generateUniqueId('mrc', 'merchant')

    merchant = await prisma.merchant.create({
      data: {
        id: merchantId,
        businessName: shopData.shop_owner || shopData.name,
        email: shopData.email,
        phone: shopData.phone || '',
        password: null, // Will be set later via email
        status: 'ACTIVE',
        isActive: true,
        mode: 'TEST', // Default to test mode
        emailVerified: true, // Shopify already verified
        emailVerifiedAt: new Date(),
      },
    })

    // Create merchant profile
    await prisma.merchantProfile.create({
      data: {
        id: await generateUniqueId('mpr', 'merchantProfile'),
        merchantId: merchant.id,
        onboardingStatus: 'PENDING',
      },
    })

    // Generate password setup token
    const setupToken = generateRefreshToken({
      id: merchant.id,
      email: merchant.email,
    })

    await prisma.merchant.update({
      where: { id: merchant.id },
      data: {
        refreshToken: setupToken,
        refreshTokenExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    })

    // TODO: Send "Set Password" email with setupToken

    isNewInstall = true
  }

  // Check if store already exists
  let store = await prisma.merchantStore.findFirst({
    where: {
      merchantId: merchant.id,
      storeUrl: shop,
    },
  })

  if (store) {
    // Update existing store
    store = await prisma.merchantStore.update({
      where: { id: store.id },
      data: {
        accessToken: access_token,
        scopes: scope,
        status: 'ACTIVE',
        isActive: true,
        installedAt: new Date(),
        installationCount: { increment: 1 },
        storeInfo: shopData,
        syncStatus: 'IDLE',
      },
    })
  } else {
    // Create new store
    const storeId = await generateUniqueId('str', 'merchantStore')

    store = await prisma.merchantStore.create({
      data: {
        id: storeId,
        merchantId: merchant.id,
        storeType: 'SHOPIFY',
        storeName: shopData.name,
        storeUrl: shop,
        customDomain: shopData.domain,
        connectionType: 'OAUTH',
        apiKey: SHOPIFY_API_KEY,
        apiSecret: SHOPIFY_API_SECRET,
        accessToken: access_token,
        scopes: scope,
        status: 'ACTIVE',
        isActive: true,
        installedAt: new Date(),
        storeInfo: shopData,
        syncStatus: 'IDLE',
      },
    })

    // Create store config with default settings
    await prisma.storeConfig.create({
      data: {
        id: await generateUniqueId('scf', 'storeConfig'),
        storeId: store.id,
      },
    })
  }

  // Update state record with merchantId
  await prisma.shopifyState.update({
    where: { id: stateRecord.id },
    data: { merchantId: merchant.id },
  })

  try {
    await registerWebhooks(shop, access_token)
  } catch (error) {
    logger.error('Failed to register webhooks:', error)
    // Don't fail the whole flow if webhooks fail
  }

  return {
    merchantId: merchant.id,
    storeId: store.id,
    isNewInstall,
  }
}

/**
 * Get merchant by shop URL
 */
export const getMerchantByShop = async (shop: string) => {
  const store = await prisma.merchantStore.findFirst({
    where: { storeUrl: shop },
    include: {
      merchant: {
        select: {
          id: true,
          businessName: true,
          email: true,
          mode: true,
        },
      },
    },
  })

  if (!store) {
    throw new AppError('Store not found', 404)
  }

  return store
}
