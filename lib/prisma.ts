import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// During build time, don't initialize Prisma to prevent build errors
const isBuildTime = process.env.npm_lifecycle_event === 'build' ||
  process.env.NEXT_PHASE === 'phase-production-build'

export const prisma = isBuildTime ?
  ({} as any) : // Return a mock object during build
  (globalForPrisma.prisma ?? new PrismaClient())

if (process.env.NODE_ENV !== 'production' && !isBuildTime) globalForPrisma.prisma = prisma