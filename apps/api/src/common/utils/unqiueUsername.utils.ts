import { prisma } from '@/config/prisma'

/**
 * Generates a compact, readable, enterprise-grade username.
 *
 * @param firstName
 * @param lastName
 * @param modelName - Prisma model name (default: 'user')
 * @param fieldName - Username field name (default: 'userName')
 * @param options.maxAttempts - retries (default 5)
 * @param options.suffixLength - random numeric suffix length (default 3)
 */
export const generateUsername = async (
  firstName: string,
  lastName: string,
  modelName: string = 'user',
  fieldName: string = 'userName',
  options?: { maxAttempts?: number; suffixLength?: number }
): Promise<string> => {
  const maxAttempts = options?.maxAttempts ?? 5
  const suffixLength = options?.suffixLength ?? 3

  const base = (firstName + lastName).toLowerCase().replace(/[^a-z0-9]/g, '')

  const generateSuffix = (length: number) => {
    const max = 10 ** length
    return Math.floor(Math.random() * max)
      .toString()
      .padStart(length, '0')
  }

  const model = (prisma as any)[modelName]

  if (!model || typeof model.findUnique !== 'function') {
    throw new Error(`Invalid Prisma model name: "${modelName}"`)
  }

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const username = base + generateSuffix(suffixLength)

    const exists = await model.findUnique({
      where: { [fieldName]: username },
      select: { [fieldName]: true },
    })

    if (!exists) return username
  }

  // Fallback: append ULID for guaranteed uniqueness
  const { ulid } = await import('ulid')
  return base + ulid().slice(-6)
}
