import { generateUniqueId, logger } from '@/common/utils'
import { prisma } from '@/config/prisma'

interface ShopifyProduct {
  id: number
  title: string
  body_html: string
  vendor: string
  product_type: string
  handle: string
  status: string
  image: { src: string } | null
  variants: any[]
}

export const handleProductCreated = async (product: ShopifyProduct, shop: string) => {
  try {
    logger.info(`📦 Processing product webhook: ${product.title} from ${shop}`)

    // Find store
    const store = await prisma.merchantStore.findFirst({
      where: { storeUrl: shop },
    })

    if (!store) {
      logger.error(`Store not found: ${shop}`)
      return
    }

    // Check if product exists
    const existing = await prisma.shopProduct.findUnique({
      where: { externalId: String(product.id) },
    })

    if (existing) {
      logger.info(`Product ${product.title} already exists, skipping`)
      return
    }

    // Get first variant for price
    const firstVariant = product.variants[0]

    // Create product
    const productId = await generateUniqueId('prd', 'shopProduct')

    const shopProduct = await prisma.shopProduct.create({
      data: {
        id: productId,
        externalId: String(product.id),
        source: 'SHOPIFY',
        merchantId: store.merchantId,
        storeId: store.id,
        title: product.title,
        description: product.body_html,
        imageUrl: product.image?.src || null,
        price: firstVariant ? parseFloat(firstVariant.price) : 0,
        currency: 'INR',
        sku: firstVariant?.sku || null,
        barcode: firstVariant?.barcode || null,
        inventoryQty: firstVariant?.inventory_quantity || 0,
        isAvailable: product.status === 'active',
        lastFetchedAt: new Date(),
      },
    })

    // Create variants
    for (const variant of product.variants) {
      await prisma.shopProductVariant.create({
        data: {
          id: await generateUniqueId('var', 'shopProductVariant'),
          productId: shopProduct.id,
          externalId: String(variant.id),
          title: variant.title,
          price: parseFloat(variant.price),
          sku: variant.sku,
          barcode: variant.barcode,
          inventoryQty: variant.inventory_quantity,
          isAvailable: variant.inventory_quantity > 0,
        },
      })
    }

    logger.info(`✅ Product ${product.title} synced successfully`)
  } catch (error) {
    logger.error(`❌ Error processing product webhook:`, error)
    throw error
  }
}
