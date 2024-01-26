import { type PrismaClient } from '@prisma/client'

import { type SgidSessionProfile } from './sgid.utils'

export const upsertSgidAccountAndUser = async ({
  prisma,
  name,
  nric,
  mobile,
  sponsoredChildren,
  children,
}: {
  prisma: PrismaClient
  name: SgidSessionProfile['name']
  nric: SgidSessionProfile['nric']
  mobile: SgidSessionProfile['mobile']
  sub: SgidSessionProfile['sub']
  sponsoredChildren?: SgidSessionProfile['sponsoredChildren']
  children?: SgidSessionProfile['children']
}) => {
  return await prisma.$transaction(async (tx) => {
    // Create user from email
    const parentUser = await tx.user.upsert({
      where: {
        nric,
      },
      update: {
        name,
        mobile,
      },
      create: {
        name,
        nric,
        mobile,
      },
    })
    if (sponsoredChildren) {
      await Promise.all(
        sponsoredChildren.map(async (child) => {
          await tx.user.upsert({
            where: { nric: child.nric },
            update: { name: child.name, parentNric: nric },
            create: { name: child.name, nric: child.nric, parentNric: nric },
          })
        }),
      )
    }
    if (children) {
      await Promise.all(
        children.map(async (child) => {
          await tx.user.upsert({
            where: { nric: child.birth_cert_no },
            update: { name: child.name, parentNric: nric },
            create: {
              name: child.name,
              nric: child.birth_cert_no,
              parentNric: nric,
            },
          })
        }),
      )
    }

    return parentUser
  })
}
