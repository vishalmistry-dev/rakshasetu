import { Router } from 'express'

import mainAuthRoutes from '@/core/auth/auth.routes'
import merchantRoutes from '@/core/merchants/merchants.routes'
import integrationRoutes from '@/integrations/intergrations.routes'

const mainRouter = Router()

mainRouter.use(`/auth`, mainAuthRoutes)

mainRouter.use('/integrations', integrationRoutes)

mainRouter.use('/merchants', merchantRoutes)

export default mainRouter
