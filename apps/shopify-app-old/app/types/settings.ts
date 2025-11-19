export interface MerchantSettings {
  general: GeneralSettings
  pricing: PricingSettings
  notifications: NotificationSettings
  integrations: IntegrationSettings
  returns: ReturnSettings
}

export interface GeneralSettings {
  autoConfirmOrders: boolean
  sendNotifications: boolean
  defaultCourier?: 'BLUEDART' | 'DELHIVERY'
}

export interface PricingSettings {
  codFee: number
  podFee: number
  prepaidFee: number
  partialFee: number
}

export interface NotificationSettings {
  emailEnabled: boolean
  whatsappEnabled: boolean
  smsEnabled: boolean
  notifyOnNewOrder: boolean
  notifyOnPayment: boolean
  notifyOnShipment: boolean
  notifyOnDelivery: boolean
  notifyOnReturn: boolean
  notificationEmail?: string
  notificationWhatsApp?: string
}

export interface IntegrationSettings {
  metaPixelId?: string
  googleAnalyticsId?: string
  googleAdsConversionId?: string
  webhookUrl?: string
}

export interface ReturnSettings {
  returnsEnabled: boolean
  returnWindowDays: number
  returnConditions: string[]
  returnShippingPaidBy: 'MERCHANT' | 'CUSTOMER' | 'SPLIT'
  qcRequired: boolean
  qcTimeframeDays: number
  exchangesEnabled: boolean
  exchangeWindowDays: number
}
