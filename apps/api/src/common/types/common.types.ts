export interface CookieUserType {
  id: string
  firstName: string
  lastName: string
  userName: string
  email: string
  type: 'BUYER' | 'SELLER'
  is2FAVerified: boolean
  is2FAEnabled: boolean
  role?: 'USER' | 'MERCHANT'
}

export interface CookieMerchantType {
  id: string
  email: string
  businessName: string
  is2FAVerified?: boolean
  is2FAEnabled?: boolean
}
