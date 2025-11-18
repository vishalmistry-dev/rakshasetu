import { ENV } from '@/config'

export const BLUEDART_CONFIG = {
  baseURL: ENV.BLUEDART_BASE_URL,
  environment: ENV.BLUEDART_ENVIRONMENT,

  // Authentication
  auth: {
    apiKey: ENV.BLUEDART_API_KEY,
    apiSecret: ENV.BLUEDART_API_SECRET,
    clientId: ENV.BLUEDART_CLIENT_ID,
    loginId: ENV.BLUEDART_LOGIN_ID,
    licenseKey: ENV.BLUEDART_LICENSE_KEY,
  },

  // API Endpoints
  endpoints: {
    auth: '/v2/login',
    waybill: '/in/transportation/waybill/v1',
    tracking: '/in/transportation/tracking/v1',
    pickup: '/in/transportation/pickup/v1',
    cancelPickup: '/in/transportation/cancelpickup/v1',
    transitTime: '/in/transportation/transittime/v1',
    locationFinder: '/in/transportation/finder/v1',
    productServices: '/in/transportation/productservices/v1',
    altInstruction: '/in/transportation/altinstruction/v1',
  },

  // Token settings
  token: {
    expiryBuffer: 5 * 60 * 1000, // Refresh 5 minutes before expiry
  },
}
