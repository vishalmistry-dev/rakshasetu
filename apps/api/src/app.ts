import mainRouter from '@/routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import { errorHandler, notFoundHandler, requestLogger } from './common/middleware'
import { ENV } from './config'

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
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: 'v1',
    })
  })

  // API v1 routes
  app.use('/api/v1', mainRouter)

  // Catch undefined routes
  app.use(notFoundHandler)

  // Global error handler
  app.use(errorHandler)

  return app
}
