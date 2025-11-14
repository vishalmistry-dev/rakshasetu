import bcrypt from 'bcryptjs'
import { prisma } from '../src/config'

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  const merchant = await prisma.merchant.create({
    data: {
      id: 'mrc_test_001',
      businessName: 'Test Store',
      email: 'test@merchant.com',
      phone: '9876543210',
      password: hashedPassword,
      status: 'ACTIVE',
      isActive: true,
      mode: 'TEST',
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },
  })

  console.log('✅ Test merchant created:', merchant.email)
}

main()
  .catch(console.error)
  .finally(() => process.exit(0))
