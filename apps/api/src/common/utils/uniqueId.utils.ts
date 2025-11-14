// src/common/utils/generateUniqueId.ts
import { prisma } from '@/config/prisma' // your global prisma instance
import { ulid } from 'ulid'
import { AppError } from '../errors'

/**
 * Generates a unique ULID-based ID with a prefix, ensuring no duplicates in the given model.
 *
 * @param prefix - Short identifier for the model (e.g., "usr", "ord")
 * @param modelName - Prisma model name as string (must match your Prisma model)
 * @param field - The unique field to check (default: "id")
 *
 * @example
 *   const userId = await generateUniqueId("usr", "user");
 *   const orderId = await generateUniqueId("ord", "order");
 */
export const generateUniqueId = async (
  prefix: string,
  modelName: string,
  field: string = 'id'
): Promise<string> => {
  const model = (prisma as any)[modelName]

  if (!model || typeof model.findUnique !== 'function') {
    throw new AppError(`Invalid Prisma model name: "${modelName}"`)
  }

  for (let i = 0; i < 10; i++) {
    const id = `${prefix}_${ulid()}`
    const existing = await model.findUnique({ where: { [field]: id } })

    if (!existing) return id
  }

  throw new AppError(`❌ Failed to generate unique ID for model "${modelName}" after 10 attempts.`)
}
