import { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'sonner'

export class ApiInterceptors {
  static setupRequestInterceptor(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config) => {
        // Add custom headers, auth tokens, etc.
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  static setupResponseInterceptor(instance: AxiosInstance) {
    instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        this.handleApiError(error)
        return Promise.reject(error)
      }
    )
  }

  private static handleApiError(error: AxiosError) {
    if (!error.response) {
      toast.error('Network Error', {
        description: 'Unable to reach the server',
      })
      return
    }

    const status = error.response.status
    const message = (error.response.data as any)?.message || error.message

    switch (status) {
      case 401:
        this.handleUnauthorized()
        break
      case 403:
        toast.error('Forbidden', {
          description: "You don't have permission",
        })
        break
      case 404:
        toast.error('Not Found', {
          description: message,
        })
        break
      case 500:
        toast.error('Server Error', {
          description: 'Something went wrong',
        })
        break
      default:
        toast.error('Error', {
          description: message,
        })
    }
  }

  private static handleUnauthorized() {
    const path = window.location.pathname

    if (path.startsWith('/admin')) {
      window.location.href = '/admin/login'
    } else if (path.startsWith('/merchant')) {
      window.location.href = '/merchant/login'
    } else if (path.startsWith('/shop')) {
      window.location.href = '/shop/login'
    }
  }
}
