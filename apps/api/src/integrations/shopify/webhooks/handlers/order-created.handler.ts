import { generateUniqueId, logger } from '@/common/utils'
import { prisma } from '@/config/prisma'

interface ShopifyOrder {
  id: number
  name: string
  email: string
  created_at: string
  total_price: string
  subtotal_price: string
  total_tax: string
  total_discounts: string
  currency: string
  financial_status: string
  fulfillment_status: string | null
  line_items: any[]
  customer: any
  shipping_address: any
  billing_address: any
  note: string | null
  tags: string
}

export const handleOrderCreated = async (order: ShopifyOrder, shop: string) => {
  try {
    logger.info(`📦 Processing order webhook: ${order.name} from ${shop}`)

    // Find the store
    const store = await prisma.merchantStore.findFirst({
      where: { storeUrl: shop },
    })

    if (!store) {
      logger.error(`Store not found: ${shop}`)
      return
    }

    // Check if order already exists
    const existing = await prisma.shopOrder.findUnique({
      where: { externalId: String(order.id) },
    })

    if (existing) {
      logger.info(`Order ${order.name} already exists, skipping`)
      return
    }

    // Create order
    const orderId = await generateUniqueId('ord', 'shopOrder')

    const shopOrder = await prisma.shopOrder.create({
      data: {
        id: orderId,
        externalId: String(order.id),
        source: 'SHOPIFY',
        merchantId: store.merchantId,
        storeId: store.id,
        name: order.name,
        createdAt: new Date(order.created_at),
        currency: order.currency,
        totalPrice: parseFloat(order.total_price),
        subtotalPrice: order.subtotal_price ? parseFloat(order.subtotal_price) : null,
        totalTax: order.total_tax ? parseFloat(order.total_tax) : null,
        totalDiscounts: order.total_discounts ? parseFloat(order.total_discounts) : null,
        financialStatus: mapFinancialStatus(order.financial_status),
        fulfillmentStatus: mapFulfillmentStatus(order.fulfillment_status),
        customerName: order.customer?.first_name + ' ' + order.customer?.last_name,
        customerEmail: order.email,
        customerPhone: order.customer?.phone,
        shippingAddress: order.shipping_address,
        billingAddress: order.billing_address,
        note: order.note,
        tags: order.tags,
        status: 'CREATED',
        syncedAt: new Date(),
      },
    })

    // Create order items
    for (const item of order.line_items) {
      // Find product in our DB
      const product = await prisma.shopProduct.findFirst({
        where: {
          storeId: store.id,
          externalId: String(item.product_id),
        },
      })

      if (product) {
        await prisma.shopOrderItem.create({
          data: {
            id: await generateUniqueId('oit', 'shopOrderItem'),
            orderId: shopOrder.id,
            productId: product.id,
            variantId: item.variant_id ? String(item.variant_id) : null,
            externalId: String(item.id),
            title: item.title,
            quantity: item.quantity,
            price: parseFloat(item.price),
            sku: item.sku,
            fulfillmentStatus: item.fulfillment_status,
          },
        })
      }
    }

    logger.info(`✅ Order ${order.name} synced successfully`)
  } catch (error) {
    logger.error(`❌ Error processing order webhook:`, error)
    throw error
  }
}

// Helper: Map Shopify financial status to our enum
const mapFinancialStatus = (status: string) => {
  const mapping: Record<string, any> = {
    pending: 'INITIATED',
    authorized: 'AUTHORIZED',
    paid: 'CAPTURED',
    refunded: 'REFUNDED',
    partially_refunded: 'PARTIALLY_REFUNDED',
    voided: 'FAILED',
  }
  return mapping[status] || 'INITIATED'
}

// Helper: Map Shopify fulfillment status to our enum
const mapFulfillmentStatus = (status: string | null) => {
  if (!status) return 'UNFULFILLED'

  const mapping: Record<string, any> = {
    fulfilled: 'FULFILLED',
    partial: 'PARTIALLY_FULFILLED',
    restocked: 'CANCELLED',
  }
  return mapping[status] || 'UNFULFILLED'
}
