export type SubdomainType = 'admin' | 'merchant' | 'shop' | 'rsmart'

export interface AuthConfig {
  cookieName: string
  apiEndpoint: string
  loginPath: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'admin' | 'moderator'
  permissions: string[]
}

export interface MerchantUser {
  id: string
  email: string
  businessName: string
  status: 'active' | 'pending' | 'suspended'
  storeCount: number
}

export interface ShopUser {
  id: string
  email: string
  name: string
  phone: string
}

export interface RsmartUser {
  id: string
  email: string
  name: string
}
