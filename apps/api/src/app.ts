import mainRouter from '@/routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import { errorHandler, notFoundHandler, requestLogger } from './common/middleware'
import { ENV } from './config'

// import { listRoutes } from '@/scripts/list-routes'

export const createApp = (): Application => {
  const app = express()

  // CORS configuration
  const allowedOrigins = ENV.CORS_ORIGIN.split(',').map((origin) => origin.trim())

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true)

        if (allowedOrigins.includes(origin)) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      credentials: true, // Allow cookies
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )

  // Middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(requestLogger)

  // Health check (unversioned)
  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: 'v1',
    })
  })

  app.get('/rsmart/status', (_req, res) => {
    res.json({
      status: 'COMING_SOON',
      title: 'RSmart Marketplace',
      description: "India's most secure P2P marketplace with built-in escrow protection",
      features: [
        'Buy & sell with complete security',
        'Escrow payment protection',
        'Direct chat with buyers/sellers',
        'Custom order requests',
        'Service marketplace',
      ],
      launchDate: 'Q1 2026',
      notifyMe: 'https://rakshasetu.com/notify-rsmart',
    })
  })

  // API v1 routes
  app.use('/api/', mainRouter)

  // Catch undefined routes
  app.use(notFoundHandler)

  // Global error handler
  app.use(errorHandler)

  // if (process.env.NODE_ENV === 'development') {
  //   console.log('\n' + '='.repeat(80))
  //   console.log('📋 REGISTERED API ROUTES')
  //   console.log('='.repeat(80))

  //   // Method 1: Using express-list-routes package
  //   // expressListRoutes(app)
  //   listRoutes(app)
  // }

  return app
}
