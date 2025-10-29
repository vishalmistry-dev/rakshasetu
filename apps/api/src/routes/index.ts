import { Router } from 'express'
import { getUsers } from '../controllers/user.controller'

const router = Router()

// User routes
router.get('/users', getUsers)
// router.post('/users', createUser)

export default router