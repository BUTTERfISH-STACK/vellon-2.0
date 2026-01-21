import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = globalForPrisma.prisma ?? new PrismaClient({})
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client
    return client[prop as keyof PrismaClient]
  }
})