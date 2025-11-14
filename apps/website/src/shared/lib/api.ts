import axios from 'axios'
import { toast } from 'sonner'

// Create axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor - handles errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't show toast if error is already handled
    if (error.config?.skipErrorToast) {
      return Promise.reject(error)
    }

    const status = error.response?.status
    const message = error.response?.data?.message || 'Something went wrong'

    // Handle specific errors
    if (status === 401) {
      toast.error('Session expired', {
        description: 'Please login again',
      })

      // Redirect to login based on current path
      const path = window.location.pathname
      if (path.startsWith('/admin')) {
        window.location.href = '/admin/login'
      } else if (path.startsWith('/merchant')) {
        window.location.href = '/merchant/login'
      } else if (path.startsWith('/shop')) {
        window.location.href = '/shop/login'
      }
    } else if (status === 403) {
      toast.error('Access denied', {
        description: "You don't have permission",
      })
    } else if (status === 404) {
      toast.error('Not found', {
        description: message,
      })
    } else if (status === 500) {
      toast.error('Server error', {
        description: 'Please try again later',
      })
    } else {
      toast.error('Error', {
        description: message,
      })
    }

    return Promise.reject(error)
  }
)

// Request interceptor - can add auth tokens here if needed
api.interceptors.request.use(
  (config) => {
    // You can add custom headers here
    // Example: config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
