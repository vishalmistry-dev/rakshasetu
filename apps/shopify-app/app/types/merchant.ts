export interface Merchant {
  id: string
  businessName: string
  email: string
  phone: string
  status: 'ACTIVE' | 'SUSPENDED' | 'BANNED'
  isActive: boolean
  mode: 'TEST' | 'LIVE'
  image?: string
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
}

export interface MerchantProfile {
  id: string
  businessType?: 'PROPRIETORSHIP' | 'PARTNERSHIP' | 'LLP' | 'PRIVATE_LIMITED'
  gstNumber?: string
  panNumber?: string
  aadharNumber?: string
  bankAccount?: string
  ifscCode?: string
  accountHolder?: string
  kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
  gstVerified: 'PENDING' | 'APPROVED' | 'REJECTED'
  bankVerified: 'PENDING' | 'APPROVED' | 'REJECTED'
  onboardingStatus: 'PENDING' | 'COMPLETED' | 'SKIPPED'
}

export interface Address {
  id: string
  label?: string
  type: 'PICKUP' | 'RETURN' | 'BOTH'
  name?: string
  phone?: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  country: string
  landmark?: string
  isDefault: boolean
}

export interface PackageProfile {
  id: string
  label: string
  lengthCm: number
  widthCm: number
  heightCm: number
  weightGrams: number
  isDefault: boolean
}

export interface OnboardingFormData {
  businessName: string
  businessType: string
  gstNumber: string
  panNumber: string
  phone: string
  whatsappNumber?: string
  pickupAddress: Omit<Address, 'id' | 'isDefault'>
  returnAddress?: Omit<Address, 'id' | 'isDefault'>
  sameAsPickup: boolean
  bankAccount: string
  confirmBankAccount: string
  ifscCode: string
  accountHolder: string
  pricingPlan: 'PER_ORDER' | 'SUBSCRIPTION'
  agreeToTerms: boolean
  authorizeCollection: boolean
}
