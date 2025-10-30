import { Request, Response } from 'express'
import { prisma } from '@rakshasetu/database'

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        res.json({ success: true, data: users })
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch users' })
    }
}

// // Create user
// export const createUser = async (req: Request, res: Response) => {
//     try {
//         const { email, name } = req.body

//         const user = await prisma.user.create({
//             data: { email, name }
//         })

//         res.json({ success: true, data: user })
//     } catch (error) {
//         res.status(500).json({ success: false, error: 'Failed to create user' })
//     }
// }