import { MerchantRepository } from '@/modules/merchant/api/auth.repository'
import { showToast } from '@/shared/components/common/Toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useMerchantLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: MerchantRepository.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchant', 'current'] })
      showToast('success', {
        title: 'Logged out',
        description: 'You have been logged out successfully.',
      })
      router.push('/login')
    },
  })
}
