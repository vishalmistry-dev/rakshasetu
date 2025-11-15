import { MerchantRepository } from '@/modules/merchant/api/auth.repository'
import { showToast } from '@/shared/components/common/Toast'
import { useMutation } from '@tanstack/react-query'

export function useMerchantResetPassword(token: string) {
  return useMutation({
    mutationFn: (data: { newPassword: string; confirmPassword: string }) =>
      MerchantRepository.resetPassword(token, data),
    onSuccess: () => {
      showToast('success', {
        title: 'Password Reset',
        description: 'Your password has been updated successfully.',
      })
    },
  })
}
