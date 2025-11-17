import type { Merchant, MerchantProfile, OnboardingFormData } from '~/types/merchant'
import { apiClient } from './client'

export const merchantsApi = {
  async get(shop: string): Promise<Merchant & { profile: MerchantProfile }> {
    const response = await apiClient<Merchant & { profile: MerchantProfile }>(
      `/integrations/shopify/merchants/profile?shop=${shop}`
    )

    return response.data
  },

  async onboard(shop: string, data: OnboardingFormData): Promise<{ success: boolean }> {
    const response = await apiClient<{ message: string }>(
      `/integrations/shopify/merchants/onboard?shop=${shop}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    )

    return { success: response.success }
  },

  async updateSettings(
    shop: string,
    type: 'general' | 'notifications' | 'preferences' | 'logistics',
    settings: Record<string, unknown>
  ): Promise<{ success: boolean }> {
    const response = await apiClient<{ message: string }>(
      `/integrations/shopify/merchants/settings/${type}?shop=${shop}`,
      {
        method: 'PUT',
        body: JSON.stringify(settings),
      }
    )

    return { success: response.success }
  },
}
