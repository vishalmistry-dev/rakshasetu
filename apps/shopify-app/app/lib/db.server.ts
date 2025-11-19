import { prisma } from '@rakshasetu/database'

// Re-export for use in Shopify app
export { prisma }

// Example: Get users
export async function getUsers() {
  return await prisma.user.findMany()
}

// Example: Create user
export async function createUser(email: string, firstName: string) {
  return await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      email,
      firstName,
      lastName: '',
      userName: email,
      business: '',
      mobile: '',
      password: '',
    },
  })
}
