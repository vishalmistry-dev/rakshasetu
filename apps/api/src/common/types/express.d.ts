// common/types/express.d.ts

import { CookieMerchantType, CookieUserType } from './common.types'

declare global {
  namespace Express {
    interface Request {
      user?: CookieUserType
      merchant?: CookieMerchantType
      admin?: any // keep if needed
      apiKey?: any
      guest?: any
      order?: any
      store?: any

      shop?: string
      storeId?: string
    }
  }
}
