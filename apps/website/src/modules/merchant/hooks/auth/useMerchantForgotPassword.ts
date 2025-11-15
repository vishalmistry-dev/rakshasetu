import { MerchantRepository } from '@/modules/merchant/api/auth.repository'
import { showToast } from '@/shared/components/common/Toast'
import { useMutation } from '@tanstack/react-query'

export function useMerchantForgotPassword() {
  return useMutation({
    mutationFn: MerchantRepository.forgotPassword,
    onSuccess: () => {
      showToast('success', {
        title: 'Password Reset Link Sent',
        description: 'Please check your email to reset your password.',
      })
    },
  })
}
