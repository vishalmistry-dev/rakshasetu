import { createApp } from "./app"
import { logger } from "./common/utils/logger.utils"
import { ENV } from './config/env'

const app = createApp()

const PORT = ENV.PORT || 5000

app.listen(PORT, () => {
    logger.info(`🚀 Server running on port http://localhost:${PORT}`)
})