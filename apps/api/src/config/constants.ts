import { CookieOptions } from 'express'
// import { ENV } from './env'

// const frontendDomain = ENV.FRONTEND_BASE_URI
//   ? ENV.FRONTEND_BASE_URI.replace(/^https?:\/\//, '').split(':')[0]
//   : undefined

// export const cookieOptions: CookieOptions = {
//   httpOnly: true,
//   secure: ENV.NODE_ENV === 'production', // true only in prod
//   sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax', // lax for localhost
//   domain: ENV.NODE_ENV === 'production' ? frontendDomain : undefined,
//   path: '/',
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// }

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  domain: undefined, // allows subdomains
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}
