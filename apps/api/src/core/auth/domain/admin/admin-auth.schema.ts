import { z } from 'zod'

// Login
export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Register (for super admin to create admins)
export const createAdminSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  userName: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  roleId: z.string().min(1, 'Role is required'),
})

// Update admin
export const updateAdminSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  userName: z.string().min(3).optional(),
  email: z.string().email().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  roleId: z.string().optional(),
})

// Change password
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
})

export type AdminLoginInput = z.infer<typeof adminLoginSchema>
export type CreateAdminInput = z.infer<typeof createAdminSchema>
export type UpdateAdminInput = z.infer<typeof updateAdminSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>

// JWT Payload
export interface AdminJwtPayload {
  adminId: string
  email: string
  roleId: string
  permissions: string[]
}
