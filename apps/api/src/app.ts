import cors from 'cors'
import express, { Application } from 'express'
import { errorHandler, notFoundHandler, requestLogger } from './common/middleware'
import { asyncHandler, sendResponse } from './common/utils'


export const createApp = (): Application => {
    const app = express()

    app.use(cors())
    app.use(express.json())

    app.use(requestLogger)

    // Routes (example)
    app.get('/ping', asyncHandler(async (_req, res) => {
        sendResponse(res, { message: 'pong' });
    }));

    // Catch undefined routes
    app.use(notFoundHandler);

    // Global error handler
    app.use(errorHandler);

    return app
}