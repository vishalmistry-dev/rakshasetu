import { AuthConfig, SubdomainType } from '@/shared/types/auth.types'

export const AUTH_CONFIGS: Record<SubdomainType, AuthConfig> = {
  admin: {
    cookieName: 'adminAccessToken',
    apiEndpoint: '/admin/current-admin',
    loginPath: '/admin/login',
  },
  merchant: {
    cookieName: 'merchantAccessToken',
    apiEndpoint: '/merchants/profile',
    loginPath: '/merchant/login',
  },
  shop: {
    cookieName: 'shopAccessToken',
    apiEndpoint: '/shop/current-user',
    loginPath: '/shop/login',
  },
  rsmart: {
    cookieName: 'rsmartAccessToken',
    apiEndpoint: '/rsmart/current-user',
    loginPath: '/rsmart/login',
  },
}
