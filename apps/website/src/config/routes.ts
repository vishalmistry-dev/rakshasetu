// src/config/routes.ts

export const ROUTE_CONFIG = {
  admin: {
    internalPath: '/admin',
    cookie: 'adminAccessToken',
    publicRoutes: ['/admin/login', '/admin/forgot-password', '/admin/reset-password'],
  },
  merchant: {
    internalPath: '/merchant',
    cookie: 'merchantAccessToken',
    publicRoutes: [
      '/merchant/login',
      '/merchant/register',
      '/merchant/forgot-password',
      '/merchant/reset-password',
    ],
  },
  shop: {
    internalPath: '/shop',
    cookie: 'shopAccessToken',
    publicRoutes: ['/shop', '/shop/login', '/shop/register'],
  },
  rsmart: {
    internalPath: '/rsmart',
    cookie: 'rsmartAccessToken',
    publicRoutes: ['/rsmart/login'],
  },
} as const
