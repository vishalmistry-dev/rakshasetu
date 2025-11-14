import { AppError } from '@/common/errors'
import { logger } from '@/common/utils'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { blueDartAuthManager } from './bluedart.auth'
import { BLUEDART_CONFIG } from './bluedart.config'

class BlueDartClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: BLUEDART_CONFIG.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds
    })

    // Request interceptor - Add JWT token
    this.client.interceptors.request.use(
      async (config) => {
        // Skip auth for login endpoint
        if (config.url?.includes('/login')) {
          return config
        }

        // Get JWT token
        const token = await blueDartAuthManager.getToken()
        config.headers.Authorization = `Bearer ${token}`

        // Add API Key to headers
        config.headers['JWTToken'] = token

        logger.debug(`BlueDart API Request: ${config.method?.toUpperCase()} ${config.url}`)
        return config
      },
      (error) => {
        logger.error('BlueDart request interceptor error:', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor - Handle errors
    this.client.interceptors.response.use(
      (response) => {
        logger.debug(`BlueDart API Response: ${response.status} ${response.config.url}`)
        return response
      },
      async (error) => {
        const originalRequest = error.config

        // Handle 401 Unauthorized - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          logger.warn('BlueDart JWT token expired, refreshing...')

          // Clear cached token and retry
          blueDartAuthManager.clearToken()
          const newToken = await blueDartAuthManager.getToken()

          originalRequest.headers.Authorization = `Bearer ${newToken}`
          originalRequest.headers.JWTToken = newToken

          return this.client(originalRequest)
        }

        // Log error
        logger.error('BlueDart API Error:', {
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
        })

        return Promise.reject(error)
      }
    )
  }

  /**
   * Generic POST request
   */
  async post<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post(endpoint, data, config)
      return response.data
    } catch (error: any) {
      this.handleError(error)
      throw error
    }
  }

  /**
   * Generic GET request
   */
  async get<T>(endpoint: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get(endpoint, { params, ...config })
      return response.data
    } catch (error: any) {
      this.handleError(error)
      throw error
    }
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): void {
    if (error.response) {
      // API returned error response
      const { status, data } = error.response

      if (status === 400) {
        throw new AppError(data?.Status?.StatusInformation || 'Invalid request parameters', 400)
      }

      if (status === 401) {
        throw new AppError('BlueDart authentication failed', 401)
      }

      if (status === 403) {
        throw new AppError('Access to BlueDart API is forbidden', 403)
      }

      if (status >= 500) {
        throw new AppError('BlueDart service is temporarily unavailable', 503)
      }

      throw new AppError(data?.Status?.StatusInformation || 'BlueDart API request failed', status)
    } else if (error.request) {
      // Request made but no response
      throw new AppError('No response from BlueDart API', 503)
    } else {
      // Error in request configuration
      throw new AppError('Failed to configure BlueDart API request', 500)
    }
  }
}

// Singleton instance
export const blueDartClient = new BlueDartClient()
