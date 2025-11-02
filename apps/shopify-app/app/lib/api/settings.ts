/* eslint-disable @typescript-eslint/no-unused-vars */

import type { MerchantSettings } from '~/types/settings'

export const settingsApi = {
  async get(_shop: string): Promise<MerchantSettings> {
    // Prefix with _
    return {
      general: { autoConfirmOrders: true, sendNotifications: true, defaultCourier: 'BLUEDART' },
      pricing: { codFee: 30, podFee: 30, prepaidFee: 20, partialFee: 25 },
      notifications: {
        emailEnabled: true,
        whatsappEnabled: true,
        smsEnabled: false,
        notifyOnNewOrder: true,
        notifyOnPayment: true,
        notifyOnShipment: true,
        notifyOnDelivery: true,
        notifyOnReturn: true,
      },
      integrations: {},
      returns: {
        returnsEnabled: true,
        returnWindowDays: 7,
        returnConditions: [],
        returnShippingPaidBy: 'MERCHANT',
        qcRequired: false,
        qcTimeframeDays: 2,
        exchangesEnabled: false,
        exchangeWindowDays: 7,
      },
    }
  },

  async update(shop: string, section: keyof MerchantSettings, data: Record<string, unknown>) {
    // Changed from any
    console.log('Updating', section, 'for', shop, ':', data) // Use shop
    return { success: true }
  },
}
