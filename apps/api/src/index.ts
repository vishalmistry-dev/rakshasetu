import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'

// Load environment variables from root
dotenv.config({ path: '../../.env' })

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Rakshasetu API is running' })
})

// Routes
app.use('/api', routes)

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})