import { ApiResponse } from '@/shared/types/api.types'
import { AxiosRequestConfig } from 'axios'
import { apiClient } from './axios-instance'
import { ApiInterceptors } from './interceptors'

// Setup interceptors
ApiInterceptors.setupRequestInterceptor(apiClient)
ApiInterceptors.setupResponseInterceptor(apiClient)

export class ApiClient {
  static async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.request<ApiResponse<T>>(config)
    return response.data.data
  }

  static async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url })
  }

  static async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }

  static async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data })
  }

  static async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH', url, data })
  }

  static async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url })
  }
}
