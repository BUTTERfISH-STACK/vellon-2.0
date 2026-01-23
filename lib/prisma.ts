import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// During build time, don't initialize Prisma if DATABASE_URL is not properly configured
const shouldInitializePrisma = process.env.DATABASE_URL &&
  process.env.DATABASE_URL !== 'postgresql://username:password@localhost:5432/vellon' &&
  !process.env.DATABASE_URL.includes('username:password')

export const prisma = shouldInitializePrisma ?
  (globalForPrisma.prisma ?? new PrismaClient()) :
  ({} as any) // Return a mock object during build

if (process.env.NODE_ENV !== 'production' && shouldInitializePrisma) globalForPrisma.prisma = prisma