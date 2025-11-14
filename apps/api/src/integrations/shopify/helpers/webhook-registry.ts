import { logger } from '@/common/utils'
import { ENV } from '@/config'
import { createShopifyClient } from '../api/client'

interface WebhookTopic {
  topic: string
  address: string
}

const WEBHOOK_TOPICS: WebhookTopic[] = [
  {
    topic: 'orders/create',
    address: `${ENV.SHOPIFY_APP_URL}/api/v1/integrations/shopify/webhooks/orders/create`,
  },
  {
    topic: 'products/create',
    address: `${ENV.SHOPIFY_APP_URL}/api/v1/integrations/shopify/webhooks/products/create`,
  },
  {
    topic: 'products/update',
    address: `${ENV.SHOPIFY_APP_URL}/api/v1/integrations/shopify/webhooks/products/update`,
  },
  {
    topic: 'app/uninstalled',
    address: `${ENV.SHOPIFY_APP_URL}/api/v1/integrations/shopify/webhooks/app/uninstalled`,
  },
]

/**
 * Register all webhooks for a shop
 */
export const registerWebhooks = async (shop: string, accessToken: string) => {
  try {
    logger.info(`📡 Registering webhooks for ${shop}`)

    const client = createShopifyClient(shop, accessToken)

    // Get existing webhooks
    const existingWebhooks = await client.get<{ webhooks: any[] }>('/webhooks.json')

    for (const webhook of WEBHOOK_TOPICS) {
      // Check if webhook already exists
      const exists = existingWebhooks.webhooks?.find(
        (w: any) => w.topic === webhook.topic && w.address === webhook.address
      )

      if (exists) {
        logger.info(`✓ Webhook ${webhook.topic} already registered`)
        continue
      }

      // Register webhook
      try {
        await client.post('/webhooks.json', {
          webhook: {
            topic: webhook.topic,
            address: webhook.address,
            format: 'json',
          },
        })
        logger.info(`✅ Registered webhook: ${webhook.topic}`)
      } catch (error: any) {
        logger.error(`❌ Failed to register ${webhook.topic}:`, error.message)
      }
    }

    logger.info(`🎉 Webhook registration completed for ${shop}`)
  } catch (error) {
    logger.error(`❌ Error registering webhooks:`, error)
    throw error
  }
}

/**
 * Unregister all webhooks for a shop
 */
export const unregisterWebhooks = async (shop: string, accessToken: string) => {
  try {
    logger.info(`🗑️ Unregistering webhooks for ${shop}`)

    const client = createShopifyClient(shop, accessToken)

    const existingWebhooks = await client.get<{ webhooks: any[] }>('/webhooks.json')

    for (const webhook of existingWebhooks.webhooks || []) {
      await client.delete(`/webhooks/${webhook.id}.json`)
      logger.info(`✅ Unregistered webhook: ${webhook.topic}`)
    }

    logger.info(`🎉 All webhooks unregistered for ${shop}`)
  } catch (error) {
    logger.error(`❌ Error unregistering webhooks:`, error)
    throw error
  }
}
