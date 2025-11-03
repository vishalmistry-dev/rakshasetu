import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@rakshasetu/database'
import { HandledError } from './errorTypes'

export const handlePrismaError = (err: any): HandledError | null => {
  if (err instanceof PrismaClientKnownRequestError) {
    let message = `Database error (${err.code})`

    if (err.code === 'P2002') message = `Duplicate value for field: ${err.meta?.target}`
    if (err.code === 'P2025') message = 'Record not found or already deleted'

    return {
      type: 'DatabaseError',
      message,
      meta: err.meta,
      statusCode: 400,
    }
  }

  if (err instanceof PrismaClientValidationError) {
    return {
      type: 'DatabaseValidationError',
      message: err.message,
      statusCode: 400,
    }
  }

  return null
}
