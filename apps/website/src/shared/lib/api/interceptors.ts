import { showToast } from '@/shared/components/common/Toast'
import { AxiosError, AxiosInstance } from 'axios'

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
      showToast('error', {
        title: 'Network Error',
        description: 'Unable to reach the server. Check your connection.',
      })
      return
    }

    const status = error.response.status
    const data = error.response.data as any

    const message =
      data?.message ||
      data?.error ||
      (Array.isArray(data?.errors) ? data.errors[0]?.msg : null) ||
      error.message

    switch (status) {
      case 401:
        showToast('error', {
          title: 'Unauthorized',
          description: message || 'Please login again',
        })
        this.handleUnauthorized()
        break

      case 403:
        showToast('error', {
          title: 'Access Denied',
          description: message || "You don't have permission to access this resource",
        })
        break

      case 404:
        showToast('error', {
          title: 'Not Found',
          description: message || 'The requested resource was not found',
        })
        break

      case 422:
        showToast('error', {
          title: 'Validation Error',
          description: message || 'Please check your input and try again',
        })
        break

      case 429:
        showToast('warning', {
          title: 'Too Many Requests',
          description: 'Please slow down and try again later',
        })
        break

      case 500:
        showToast('error', {
          title: 'Server Error',
          description: message || 'Something went wrong on our end. Please try again later.',
        })
        break

      case 503:
        showToast('error', {
          title: 'Service Unavailable',
          description: 'The service is temporarily unavailable. Please try again later.',
        })
        break

      default:
        showToast('error', {
          title: 'Error',
          description: message || 'An unexpected error occurred',
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
