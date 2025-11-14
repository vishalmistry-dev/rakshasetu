import { NextFunction, Request, Response } from 'express'
import { ZodError, ZodSchema } from 'zod'
import { AppError } from '../errors/AppErrorHandler'

// Tag helpers
export type TaggedSchema = {
  type: 'body' | 'query' | 'params'
  schema: ZodSchema<any>
}

// Helper functions to preserve literal type
export const bodySchema = (schema: ZodSchema<any>): TaggedSchema => ({
  type: 'body', // literal type
  schema,
})

export const querySchema = (schema: ZodSchema<any>): TaggedSchema => ({
  type: 'query',
  schema,
})

export const paramsSchema = (schema: ZodSchema<any>): TaggedSchema => ({
  type: 'params',
  schema,
})

export const validateRequest = (...schemas: TaggedSchema[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      for (const { type, schema } of schemas) {
        if (type === 'body') req.body = schema.parse(req.body)
        if (type === 'query') req.query = schema.parse(req.query)
        if (type === 'params') req.params = schema.parse(req.params)
      }
      next()
    } catch (error) {
      if (error instanceof ZodError) return next(error)
      return next(new AppError('Invalid request data', 400, false))
    }
  }
}
