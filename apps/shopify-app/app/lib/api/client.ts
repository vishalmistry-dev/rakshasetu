import { APP_CONFIG } from '../utils/constants'

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  meta?: unknown
}

export async function apiClient<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = endpoint.startsWith('http') ? endpoint : `${APP_CONFIG.API_URL}${endpoint}`

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
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
