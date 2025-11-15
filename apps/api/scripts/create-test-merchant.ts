import bcrypt from 'bcryptjs'
import { prisma } from '../src/config'

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  const merchant = await prisma.merchant.create({
    data: {
      id: 'mrc_dev_001',
      businessName: 'Dev Account',
      email: 'vishal01dev@gmail.com',
      phone: '7984315243',
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
