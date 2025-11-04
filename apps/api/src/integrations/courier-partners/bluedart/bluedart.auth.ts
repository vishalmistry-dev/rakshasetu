import { AppError } from '@/common/errors'
import { logger } from '@/common/utils'
import axios from 'axios'
import { BLUEDART_CONFIG } from './bluedart.config'
import { BlueDartAuthResponse } from './bluedart.types'

class BlueDartAuthManager {
  private jwtToken: string | null = null
  private tokenExpiry: number | null = null

  /**
   * Get valid JWT token (returns cached or fetches new)
   */
  async getToken(): Promise<string> {
    // Check if token is still valid
    if (this.jwtToken && this.tokenExpiry) {
      const now = Date.now()
      const timeUntilExpiry = this.tokenExpiry - now

      // If token expires in more than 5 minutes, use it
      if (timeUntilExpiry > BLUEDART_CONFIG.token.expiryBuffer) {
        logger.debug('Using cached BlueDart JWT token')
        return this.jwtToken
      }
    }

    // Fetch new token
    logger.info('Fetching new BlueDart JWT token')
    return await this.fetchNewToken()
  }

  /**
   * Fetch new JWT token from BlueDart
   */
  private async fetchNewToken(): Promise<string> {
    try {
      const response = await axios.post<BlueDartAuthResponse>(
        `${BLUEDART_CONFIG.baseURL}${BLUEDART_CONFIG.endpoints.auth}`,
        {
          ClientID: BLUEDART_CONFIG.auth.clientId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            clientSecret: BLUEDART_CONFIG.auth.apiSecret,
          },
        }
      )

      const { JWTToken, expires_in } = response.data

      if (!JWTToken) {
        throw new AppError('No JWT token received from BlueDart', 500)
      }

      // Store token and expiry
      this.jwtToken = JWTToken

      // Default 1 hour if not provided
      const expirySeconds = expires_in || 3600
      this.tokenExpiry = Date.now() + expirySeconds * 1000

      logger.info('BlueDart JWT token fetched successfully')
      return JWTToken
    } catch (error: any) {
      logger.error('Failed to fetch BlueDart JWT token:', error.response?.data || error.message)
      throw new AppError('BlueDart authentication failed', 500)
    }
  }

  /**
   * Clear cached token (force refresh on next request)
   */
  clearToken(): void {
    this.jwtToken = null
    this.tokenExpiry = null
    logger.debug('BlueDart JWT token cleared')
  }
}

// Singleton instance
export const blueDartAuthManager = new BlueDartAuthManager()
