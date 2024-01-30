/**
 * Instantiates a single instance PrismaClient and save it on the global object.
 * @link https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
import { PrismaClient } from '@prisma/client'
import { fieldEncryptionExtension } from 'prisma-field-encryption'
import { env } from '~/env.mjs'
function getExtendedClient() {
  return new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  }).$extends(fieldEncryptionExtension())
}
export type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>

const prismaGlobal = global as typeof global & {
  prisma?: ExtendedPrismaClient
}

export const prisma: ExtendedPrismaClient =
  prismaGlobal.prisma || getExtendedClient()

if (env.NODE_ENV !== 'production') {
  prismaGlobal.prisma = prisma
}
