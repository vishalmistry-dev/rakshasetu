import { logger } from '@/common/utils'
import { prisma } from '@/config/prisma'

// ========================== GET PLATFORM SETTINGS ==========================
export const getPlatformSettings = async () => {
  try {
    const settings = await prisma.platformSetting.findFirst({
      orderBy: { updatedAt: 'desc' },
    })

    if (!settings) {
      // Create default settings
      return await prisma.platformSetting.create({
        data: {
          id: 'platform_settings_1',
          platformName: 'RakshaSetu',
          platformEmail: 'support@rakshasetu.com',
          platformPhone: '+91-9876543210',
          currency: 'INR',
          taxRate: 18.0,
          maintenanceMode: false,
          allowNewRegistrations: true,
          requireEmailVerification: true,
          requirePhoneVerification: false,
        },
      })
    }

    return settings
  } catch (error) {
    logger.error('Failed to get platform settings:', error)
    throw error
  }
}

// ========================== UPDATE PLATFORM SETTINGS ==========================
export const updatePlatformSettings = async (data: any, adminId: string) => {
  try {
    const currentSettings = await getPlatformSettings()

    const updated = await prisma.platformSetting.update({
      where: { id: currentSettings.id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    // Log activity
    await prisma.adminActivityLog.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adminId,
        action: 'SETTINGS_UPDATED',
        resource: 'PLATFORM_SETTINGS',
        resourceId: currentSettings.id,
        metadata: {
          changes: data,
        },
      },
    })

    logger.info(`Platform settings updated by admin: ${adminId}`)

    return updated
  } catch (error) {
    logger.error('Failed to update platform settings:', error)
    throw error
  }
}

// ========================== GET FEE CONFIGURATION ==========================
export const getFeeConfiguration = async () => {
  try {
    const fees = await prisma.feeConfiguration.findFirst({
      orderBy: { updatedAt: 'desc' },
    })

    if (!fees) {
      // Create default fee structure
      return await prisma.feeConfiguration.create({
        data: {
          id: 'fee_config_1',
          platformFeePercentage: 2.5,
          platformFeeFixed: 0,
          codFeePercentage: 2.0,
          codFeeFixed: 20,
          minPlatformFee: 10,
          maxPlatformFee: 1000,
          gstRate: 18.0,
        },
      })
    }

    return fees
  } catch (error) {
    logger.error('Failed to get fee configuration:', error)
    throw error
  }
}

// ========================== UPDATE FEE CONFIGURATION ==========================
export const updateFeeConfiguration = async (data: any, adminId: string) => {
  try {
    const currentFees = await getFeeConfiguration()

    const updated = await prisma.feeConfiguration.update({
      where: { id: currentFees.id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    // Log activity
    await prisma.adminActivityLog.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adminId,
        action: 'FEE_CONFIG_UPDATED',
        resource: 'FEE_CONFIGURATION',
        resourceId: currentFees.id,
        metadata: {
          changes: data,
        },
      },
    })

    logger.info(`Fee configuration updated by admin: ${adminId}`)

    return updated
  } catch (error) {
    logger.error('Failed to update fee configuration:', error)
    throw error
  }
}

// ========================== CALCULATE FEES ==========================
export const calculateFees = async (orderAmount: number, isCOD: boolean = false) => {
  try {
    const feeConfig = await getFeeConfiguration()

    // Platform fee
    let platformFee =
      (orderAmount * feeConfig.platformFeePercentage) / 100 + feeConfig.platformFeeFixed

    // Apply min/max limits
    if (platformFee < feeConfig.minPlatformFee) {
      platformFee = feeConfig.minPlatformFee
    }
    if (platformFee > feeConfig.maxPlatformFee) {
      platformFee = feeConfig.maxPlatformFee
    }

    // COD fee
    let codFee = 0
    if (isCOD) {
      codFee = (orderAmount * feeConfig.codFeePercentage) / 100 + feeConfig.codFeeFixed
    }

    // GST
    const totalFeeBeforeGST = platformFee + codFee
    const gst = (totalFeeBeforeGST * feeConfig.gstRate) / 100

    return {
      orderAmount,
      platformFee: parseFloat(platformFee.toFixed(2)),
      codFee: parseFloat(codFee.toFixed(2)),
      gst: parseFloat(gst.toFixed(2)),
      totalFee: parseFloat((totalFeeBeforeGST + gst).toFixed(2)),
      merchantReceives: parseFloat((orderAmount - totalFeeBeforeGST - gst).toFixed(2)),
    }
  } catch (error) {
    logger.error('Failed to calculate fees:', error)
    throw error
  }
}

// ========================== COURIER CONFIGURATION ==========================
export const getCourierConfiguration = async () => {
  try {
    const couriers = await prisma.courierConfiguration.findMany({
      orderBy: { priority: 'asc' },
    })

    if (couriers.length === 0) {
      // Create default courier configurations
      const defaultCouriers = [
        {
          id: 'courier_bluedart',
          courierName: 'BlueDart',
          courierCode: 'BLUEDART',
          isActive: true,
          priority: 1,
          apiCredentials: {},
        },
        {
          id: 'courier_delhivery',
          courierName: 'Delhivery',
          courierCode: 'DELHIVERY',
          isActive: false,
          priority: 2,
          apiCredentials: {},
        },
      ]

      await prisma.courierConfiguration.createMany({
        data: defaultCouriers,
      })

      return defaultCouriers
    }

    return couriers
  } catch (error) {
    logger.error('Failed to get courier configuration:', error)
    throw error
  }
}

// ========================== UPDATE COURIER CONFIGURATION ==========================
export const updateCourierConfiguration = async (courierId: string, data: any, adminId: string) => {
  try {
    const updated = await prisma.courierConfiguration.update({
      where: { id: courierId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    // Log activity
    await prisma.adminActivityLog.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adminId,
        action: 'COURIER_CONFIG_UPDATED',
        resource: 'COURIER_CONFIGURATION',
        resourceId: courierId,
        metadata: {
          changes: data,
        },
      },
    })

    logger.info(`Courier configuration updated: ${courierId} by admin: ${adminId}`)

    return updated
  } catch (error) {
    logger.error('Failed to update courier configuration:', error)
    throw error
  }
}

// ========================== ADD COURIER ==========================
export const addCourier = async (data: any, adminId: string) => {
  try {
    const courierId = `courier_${data.courierCode.toLowerCase()}`

    const courier = await prisma.courierConfiguration.create({
      data: {
        id: courierId,
        courierName: data.courierName,
        courierCode: data.courierCode,
        isActive: data.isActive || false,
        priority: data.priority || 99,
        apiCredentials: data.apiCredentials || {},
      },
    })

    // Log activity
    await prisma.adminActivityLog.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adminId,
        action: 'COURIER_ADDED',
        resource: 'COURIER_CONFIGURATION',
        resourceId: courierId,
        metadata: {
          courierName: data.courierName,
        },
      },
    })

    logger.info(`Courier added: ${courierId} by admin: ${adminId}`)

    return courier
  } catch (error) {
    logger.error('Failed to add courier:', error)
    throw error
  }
}

// ========================== DELETE COURIER ==========================
export const deleteCourier = async (courierId: string, adminId: string) => {
  try {
    await prisma.courierConfiguration.delete({
      where: { id: courierId },
    })

    // Log activity
    await prisma.adminActivityLog.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adminId,
        action: 'COURIER_DELETED',
        resource: 'COURIER_CONFIGURATION',
        resourceId: courierId,
      },
    })

    logger.info(`Courier deleted: ${courierId} by admin: ${adminId}`)

    return { success: true }
  } catch (error) {
    logger.error('Failed to delete courier:', error)
    throw error
  }
}

// ========================== EMAIL TEMPLATES ==========================
export const getEmailTemplates = async () => {
  try {
    const templates = await prisma.emailTemplate.findMany({
      orderBy: { name: 'asc' },
    })

    return templates
  } catch (error) {
    logger.error('Failed to get email templates:', error)
    throw error
  }
}

export const updateEmailTemplate = async (templateId: string, data: any, adminId: string) => {
  try {
    const updated = await prisma.emailTemplate.update({
      where: { id: templateId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    // Log activity
    await prisma.adminActivityLog.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adminId,
        action: 'EMAIL_TEMPLATE_UPDATED',
        resource: 'EMAIL_TEMPLATE',
        resourceId: templateId,
        metadata: {
          templateName: updated.name,
        },
      },
    })

    logger.info(`Email template updated: ${templateId} by admin: ${adminId}`)

    return updated
  } catch (error) {
    logger.error('Failed to update email template:', error)
    throw error
  }
}
