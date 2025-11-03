export { prisma } from './client'

// Export Prisma types
export type { PrismaClient } from '@prisma/client'

// Export Prisma error types
export {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'

// Export all generated types
export * from '@prisma/client'
