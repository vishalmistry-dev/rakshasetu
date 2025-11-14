import { logger } from '@/common/utils'
import { prisma } from '@/config/prisma'

export const handleAppUninstalled = async (shop: string) => {
  try {
    logger.info(`🗑️ App uninstalled from ${shop}`)

    // Mark store as inactive
    await prisma.merchantStore.updateMany({
      where: { storeUrl: shop },
      data: {
        status: 'INACTIVE',
        isActive: false,
        uninstalledAt: new Date(),
      },
    })

    logger.info(`✅ Store ${shop} marked as inactive`)
  } catch (error) {
    logger.error(`❌ Error handling app uninstall:`, error)
    throw error
  }
}
