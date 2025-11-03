import { Router } from 'express'
import orderRoutes from './orders/orders.routes'
import productRoutes from './products/products.routes'
import storeRoutes from './stores/stores.routes'

const router = Router()

router.use('/stores', storeRoutes)
router.use('/products', productRoutes)
router.use('/orders', orderRoutes)

export default router
