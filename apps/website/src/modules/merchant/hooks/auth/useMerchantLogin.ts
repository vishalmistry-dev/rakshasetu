import { MerchantRepository } from '@/modules/merchant/api/auth.repository'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useAdminLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: MerchantRepository.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchant', 'current'] })
      toast.success('Login successful!')
      router.push('/dashboard')
    },
    onError: (error: any) => {
      // Error already handled by interceptor
      console.error('Login error:', error)
    },
  })
}
