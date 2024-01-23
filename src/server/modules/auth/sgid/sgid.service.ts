import { type PrismaClient } from '@prisma/client'

import { type SgidSessionProfile } from './sgid.utils'

export const upsertSgidAccountAndUser = async ({
  prisma,
  name,
  nric,
}: {
  prisma: PrismaClient
  name: SgidSessionProfile['name']
  nric: SgidSessionProfile['nric']
  sub: SgidSessionProfile['sub']
}) => {
  return await prisma.$transaction(async (tx) => {
    // Create user from email
    const user = await tx.user.upsert({
      where: {
        nric,
      },
      update: {},
      create: {
        name,
        nric,
      },
    })

    return user
  })
}
