import type { Merchant, MerchantProfile, OnboardingFormData } from '~/types/merchant'

export const merchantsApi = {
  async get(shop: string): Promise<Merchant & { profile: MerchantProfile }> {
    return {
      id: 'merchant_1',
      businessName: shop.split('.')[0],
      email: 'merchant@example.com',
      phone: '+919876543210',
      status: 'ACTIVE',
      isActive: true,
      mode: 'TEST',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: {
        id: 'profile_1',
        onboardingStatus: 'PENDING',
        kycStatus: 'PENDING',
        gstVerified: 'PENDING',
        bankVerified: 'PENDING',
      },
    }
  },

  async onboard(data: OnboardingFormData): Promise<{ success: boolean }> {
    console.log('Onboarding data:', data)
    return { success: true }
  },

  async updateSettings(
    shop: string,
    settings: Record<string, unknown>
  ): Promise<{ success: boolean }> {
    // Changed from any
    console.log('Updating settings for', shop, ':', settings) // Use shop
    return { success: true }
  },
}
