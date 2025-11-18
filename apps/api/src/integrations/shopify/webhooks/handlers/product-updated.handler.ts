import { logger } from '@/common/utils'
import { prisma } from '@/config/prisma'

export const handleProductUpdated = async (product: any, shop: string) => {
  try {
    logger.info(`🔄 Updating product: ${product.title} from ${shop}`)

    const existing = await prisma.shopProduct.findUnique({
      where: { externalId: String(product.id) },
    })

    if (!existing) {
      logger.warn(`Product ${product.title} not found, skipping update`)
      return
    }

    // Update product
    await prisma.shopProduct.update({
      where: { externalId: String(product.id) },
      data: {
        title: product.title,
        description: product.body_html,
        imageUrl: product.image?.src || null,
        isAvailable: product.status === 'active',
        lastFetchedAt: new Date(),
      },
    })

    // Update variants
    for (const variant of product.variants) {
      const existingVariant = await prisma.shopProductVariant.findUnique({
        where: { externalId: String(variant.id) },
      })

      if (existingVariant) {
        await prisma.shopProductVariant.update({
          where: { externalId: String(variant.id) },
          data: {
            title: variant.title,
            price: parseFloat(variant.price),
            inventoryQty: variant.inventory_quantity,
            isAvailable: variant.inventory_quantity > 0,
          },
        })
      }
    }

    logger.info(`✅ Product ${product.title} updated successfully`)
  } catch (error) {
    logger.error(`❌ Error updating product:`, error)
    throw error
  }
}
