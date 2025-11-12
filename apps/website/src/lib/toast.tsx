import { toast } from 'sonner'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastOptions {
  title: string
  description?: string
  duration?: number
}

export const showToast = (type: ToastType, options: ToastOptions) => {
  const { title, description, duration = 3000 } = options

  toast[type](title, {
    description,
    duration,
  })
}
