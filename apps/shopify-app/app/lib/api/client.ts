import { APP_CONFIG } from '../utils/constants'

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown // Changed from any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiClient<T = unknown>( // Changed from any
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${APP_CONFIG.API_URL}${endpoint}`
  const config: RequestInit = {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  }
  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body)
  }
  try {
    const response = await fetch(url, config)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(errorData.message || `API Error`, response.status, errorData)
    }
    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError(`Network error: ${(error as Error).message}`, 0)
  }
}
