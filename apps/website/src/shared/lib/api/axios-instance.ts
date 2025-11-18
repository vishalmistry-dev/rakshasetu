import { axiosConfig } from '@/shared/config/axios.config'
import axios, { AxiosInstance } from 'axios'

class AxiosInstanceFactory {
  private static instance: AxiosInstance | null = null

  static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create(axiosConfig)
    }
    return this.instance
  }

  static resetInstance(): void {
    this.instance = null
  }
}

export const apiClient = AxiosInstanceFactory.getInstance()
