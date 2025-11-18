// src/integrations/sandbox/sandbox.client.ts

import { AppError } from '@/common/errors'
import { logger } from '@/common/utils/logger.utils'
import axios, { AxiosError, AxiosInstance } from 'axios'
import { SANDBOX_CONFIG } from './sandbox.config'
import { SandboxAuthResponse, SandboxError } from './sandbox.types'

class SandboxClient {
  private axiosInstance: AxiosInstance
  private accessToken: string | null = null
  private tokenExpiresAt: number = 0
  private isRefreshing = false
  private refreshSubscribers: Array<(token: string) => void> = []

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: SANDBOX_CONFIG.BASE_URL,
      timeout: SANDBOX_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // Skip token for auth endpoint
        if (config.url?.includes('/authenticate')) {
          config.headers['x-api-key'] = SANDBOX_CONFIG.API_KEY
          config.headers['x-api-secret'] = SANDBOX_CONFIG.API_SECRET
          return config
        }

        // Check if token is valid
        if (this.isTokenExpired()) {
          await this.refreshToken()
        }

        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<SandboxError>) => {
        const originalRequest = error.config as any

        // Handle token expiration
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`
                resolve(this.axiosInstance(originalRequest))
              })
            })
          }

          this.isRefreshing = true

          try {
            await this.refreshToken()
            this.isRefreshing = false
            this.onRefreshed(this.accessToken!)
            this.refreshSubscribers = []

            originalRequest.headers.Authorization = `Bearer ${this.accessToken}`
            return this.axiosInstance(originalRequest)
          } catch (refreshError) {
            this.isRefreshing = false
            this.refreshSubscribers = []
            return Promise.reject(refreshError)
          }
        }

        return Promise.reject(this.handleError(error))
      }
    )
  }

  private isTokenExpired(): boolean {
    if (!this.accessToken || !this.tokenExpiresAt) {
      return true
    }
    // Refresh 5 minutes before expiry
    return Date.now() >= this.tokenExpiresAt - 5 * 60 * 1000
  }

  private async refreshToken(): Promise<void> {
    try {
      logger.info('Refreshing Sandbox access token')

      const response = await axios.post<SandboxAuthResponse>(
        `${SANDBOX_CONFIG.BASE_URL}${SANDBOX_CONFIG.ENDPOINTS.AUTH}`,
        {},
        {
          headers: {
            'x-api-key': SANDBOX_CONFIG.API_KEY,
            'x-api-secret': SANDBOX_CONFIG.API_SECRET,
            'Content-Type': 'application/json',
          },
        }
      )

      this.accessToken = response.data.access_token
      this.tokenExpiresAt = Date.now() + response.data.expires_in * 1000

      logger.info('Sandbox token refreshed successfully')
    } catch (error) {
      logger.error('Failed to refresh Sandbox token', error)
      this.accessToken = null
      this.tokenExpiresAt = 0
      throw new AppError('Failed to authenticate with Sandbox', 500)
    }
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((callback) => callback(token))
  }

  private handleError(error: AxiosError<SandboxError>): AppError {
    const response = error.response

    if (!response) {
      return new AppError('Network error while contacting Sandbox', 503)
    }

    const errorData = response.data
    const statusCode = response.status

    logger.error('Sandbox API Error', {
      status: statusCode,
      error: errorData,
      url: error.config?.url,
    })

    // Map Sandbox errors to application errors
    const errorMessage = errorData?.error_description || errorData?.error || 'Unknown Sandbox error'

    switch (statusCode) {
      case 400:
        return new AppError(errorMessage, 400)
      case 401:
        return new AppError('Sandbox authentication failed', 401)
      case 403:
        return new AppError('Access forbidden', 403)
      case 404:
        return new AppError('Resource not found', 404)
      case 429:
        return new AppError('Rate limit exceeded', 429)
      case 500:
      case 502:
      case 503:
        return new AppError('Sandbox service unavailable', 503)
      default:
        return new AppError(errorMessage, statusCode)
    }
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { params })
    return response.data
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data)
    return response.data
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data)
    return response.data
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url)
    return response.data
  }

  // Force token refresh (useful for testing)
  async forceRefresh(): Promise<void> {
    this.accessToken = null
    this.tokenExpiresAt = 0
    await this.refreshToken()
  }
}

// Export singleton instance
export const sandboxClient = new SandboxClient()
