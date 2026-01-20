import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Skip instantiation if DATABASE_URL is dummy
const shouldSkipInstantiation = process.env.DATABASE_URL?.includes('dummy')

let prisma: PrismaClient

if (shouldSkipInstantiation) {
  // Create a mock PrismaClient that throws errors when methods are called
  prisma = new Proxy({} as PrismaClient, {
    get(target, prop) {
      return new Proxy({}, {
        get() {
          throw new Error('Prisma is not available during build')
        }
      })
    }
  })
} else {
  prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
}

export { prisma }