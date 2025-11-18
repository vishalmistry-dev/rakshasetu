import { MerchantRepository } from '@/modules/merchant/api/auth.repository'
import { showToast } from '@/shared/components/common/Toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useMerchantLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: MerchantRepository.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchant', 'current'] })
      showToast('success', {
        title: 'Logged in',
        description: 'Welcome back! You are logged in successfully.',
      })
      router.push('/dashboard')
    },
  })
}
