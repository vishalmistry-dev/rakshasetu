import { AxiosRequestConfig } from 'axios'

export const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:4000/api/v1',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
}
