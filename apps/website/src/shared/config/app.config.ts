export const APP_CONFIG = {
  api: {
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:4000',
    timeout: 30000,
  },
  auth: {
    skipInDev: process.env.NEXT_PUBLIC_DEV_AUTH_MODE === 'skip',
  },
  subdomains: {
    admin: {
      dev: 'admin.localhost:3000',
      prod: 'admin.rakshasetu.com',
    },
    merchant: {
      dev: 'merchant.localhost:3000',
      prod: 'merchant.rakshasetu.com',
    },
    shop: {
      dev: 'shop.localhost:3000',
      prod: 'shop.rakshasetu.com',
    },
    rsmart: {
      dev: 'rsmart.localhost:3000',
      prod: 'rsmart.rakshasetu.com',
    },
  },
} as const
