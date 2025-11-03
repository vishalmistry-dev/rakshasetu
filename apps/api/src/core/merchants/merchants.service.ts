import { AppError } from '@/common/errors'
import { generateUniqueId } from '@/common/utils'
import { prisma } from '@/config/prisma'

// ========================== GET PROFILE ==========================
export const getMerchantProfile = async (merchantId: string) => {
  const merchant = await prisma.merchant.findUnique({
    where: { id: merchantId },
    include: {
      profile: true,
      notifications: true,
      preferences: true,
      logistics: true,
      stores: {
        where: { isActive: true },
        select: {
          id: true,
          storeName: true,
          storeUrl: true,
          storeType: true,
          status: true,
        },
      },
    },
  })

  if (!merchant) {
    throw new AppError('Merchant not found', 404)
  }

  return merchant
}

// ========================== ONBOARD ==========================
export const onboardMerchant = async (merchantId: string, data: any) => {
  const merchant = await prisma.merchant.findUnique({
    where: { id: merchantId },
    include: { profile: true },
  })

  if (!merchant) {
    throw new AppError('Merchant not found', 404)
  }

  // Update or create profile
  let profile = merchant.profile

  if (!profile) {
    // Create profile if doesn't exist
    profile = await prisma.merchantProfile.create({
      data: {
        id: await generateUniqueId('mpr', 'merchantProfile'),
        merchantId: merchant.id,
        businessType: data.businessType,
        gstNumber: data.gstNumber,
        panNumber: data.panNumber,
        bankAccount: data.bankAccount,
        ifscCode: data.ifscCode,
        accountHolder: data.accountHolder,
        onboardingStatus: 'COMPLETED',
      },
    })
  } else {
    // Update existing profile
    profile = await prisma.merchantProfile.update({
      where: { id: profile.id },
      data: {
        businessType: data.businessType,
        gstNumber: data.gstNumber,
        panNumber: data.panNumber,
        bankAccount: data.bankAccount,
        ifscCode: data.ifscCode,
        accountHolder: data.accountHolder,
        onboardingStatus: 'COMPLETED',
      },
    })
  }

  // Create pickup address if provided
  if (data.pickupAddress) {
    const existingAddress = await prisma.address.findFirst({
      where: {
        merchantId: merchant.id,
        type: 'PICKUP',
      },
    })

    if (!existingAddress) {
      await prisma.address.create({
        data: {
          id: await generateUniqueId('adr', 'address'),
          merchantId: merchant.id,
          type: 'PICKUP',
          name: data.pickupAddress.name,
          phone: data.pickupAddress.phone,
          line1: data.pickupAddress.line1,
          line2: data.pickupAddress.line2,
          city: data.pickupAddress.city,
          state: data.pickupAddress.state,
          pincode: data.pickupAddress.pincode,
          country: data.pickupAddress.country || 'India',
          landmark: data.pickupAddress.landmark,
          isDefault: true,
        },
      })
    }
  }

  return {
    message: 'Onboarding completed successfully',
    profile,
  }
}

// ========================== GET ALL SETTINGS ==========================
export const getAllSettings = async (merchantId: string) => {
  const merchant = await prisma.merchant.findUnique({
    where: { id: merchantId },
    include: {
      profile: true,
      notifications: true,
      preferences: true,
      logistics: true,
    },
  })

  if (!merchant) {
    throw new AppError('Merchant not found', 404)
  }

  return {
    general: {
      businessName: merchant.businessName,
      email: merchant.email,
      phone: merchant.phone,
      mode: merchant.mode,
    },
    profile: merchant.profile,
    notifications: merchant.notifications,
    preferences: merchant.preferences,
    logistics: merchant.logistics,
  }
}

// ========================== UPDATE GENERAL SETTINGS ==========================
export const updateGeneralSettings = async (merchantId: string, data: any) => {
  const merchant = await prisma.merchant.update({
    where: { id: merchantId },
    data: {
      businessName: data.businessName,
      phone: data.phone,
    },
  })

  return merchant
}

// ========================== UPDATE NOTIFICATION SETTINGS ==========================
export const updateNotificationSettings = async (merchantId: string, data: any) => {
  let notifications = await prisma.merchantNotifications.findUnique({
    where: { merchantId },
  })

  if (!notifications) {
    // Create if doesn't exist
    notifications = await prisma.merchantNotifications.create({
      data: {
        id: await generateUniqueId('mnt', 'merchantNotifications'),
        merchantId,
        ...data,
      },
    })
  } else {
    // Update
    notifications = await prisma.merchantNotifications.update({
      where: { merchantId },
      data,
    })
  }

  return notifications
}

// ========================== UPDATE PREFERENCES ==========================
export const updatePreferences = async (merchantId: string, data: any) => {
  let preferences = await prisma.merchantPreferences.findUnique({
    where: { merchantId },
  })

  if (!preferences) {
    // Create if doesn't exist
    preferences = await prisma.merchantPreferences.create({
      data: {
        id: await generateUniqueId('mps', 'merchantPreferences'),
        merchantId,
        remittanceCycle: data.remittanceCycle || 'WEEKLY',
        ...data,
      },
    })
  } else {
    // Update
    preferences = await prisma.merchantPreferences.update({
      where: { merchantId },
      data,
    })
  }

  return preferences
}

// ========================== UPDATE LOGISTICS SETTINGS ==========================
export const updateLogisticsSettings = async (merchantId: string, data: any) => {
  let logistics = await prisma.merchantLogistics.findUnique({
    where: { merchantId },
  })

  if (!logistics) {
    // Create if doesn't exist
    logistics = await prisma.merchantLogistics.create({
      data: {
        id: await generateUniqueId('mlg', 'merchantLogistics'),
        merchantId,
        ...data,
      },
    })
  } else {
    // Update
    logistics = await prisma.merchantLogistics.update({
      where: { merchantId },
      data,
    })
  }

  return logistics
}
