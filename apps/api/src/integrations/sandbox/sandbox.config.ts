// src/integrations/sandbox/sandbox.config.ts

export const SANDBOX_CONFIG = {
  BASE_URL: process.env.SANDBOX_BASE_URL || 'https://api.sandbox.co.in/v1',
  API_KEY: process.env.SANDBOX_API_KEY!,
  API_SECRET: process.env.SANDBOX_API_SECRET!,
  TOKEN_VALIDITY: 24 * 60 * 60 * 1000, // 24 hours
  TIMEOUT: 30000, // 30 seconds

  ENDPOINTS: {
    AUTH: '/authenticate',

    // DigiLocker
    DIGILOCKER_INIT: '/kyc/digilocker/init',
    DIGILOCKER_STATUS: '/kyc/digilocker/status',
    DIGILOCKER_FETCH: '/kyc/digilocker/fetch',

    // PAN
    PAN_VERIFY: '/kyc/pan/verify',

    // GSTIN
    GSTIN_SEARCH: '/kyc/gstin/search',
    GSTIN_VERIFY: '/kyc/gstin/verify',

    // Bank
    BANK_VERIFY: '/kyc/bank/verify',
    BANK_STATUS: '/kyc/bank/status',
  },

  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
    BACKOFF_MULTIPLIER: 2,
  },
} as const

export const SANDBOX_ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_PAN: 'INVALID_PAN',
  INVALID_GSTIN: 'INVALID_GSTIN',
  BANK_VERIFICATION_FAILED: 'BANK_VERIFICATION_FAILED',
  DIGILOCKER_CONSENT_REQUIRED: 'DIGILOCKER_CONSENT_REQUIRED',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
} as const
