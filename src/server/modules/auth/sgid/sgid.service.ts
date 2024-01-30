import { type ExtendedPrismaClient } from '~/server/prisma'
import { type SgidSessionProfile } from './sgid.utils'

export const upsertSgidAccountAndUser = async ({
  prisma,
  name,
  nric,
  mobile,
  dob,
  sponsoredChildren,
  children,
}: {
  prisma: ExtendedPrismaClient
  name: SgidSessionProfile['name']
  nric: SgidSessionProfile['nric']
  mobile: SgidSessionProfile['mobile']
  dob: SgidSessionProfile['dob']
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
        dob: new Date(dob),
      },
      create: {
        name,
        nric,
        mobile,
        dob: new Date(dob),
      },
    })
    if (sponsoredChildren) {
      await Promise.all(
        sponsoredChildren.map(async (child) => {
          await tx.user.upsert({
            where: { nric: child.nric },
            update: { name: child.name, parentNric: nric },
            create: {
              name: child.name,
              nric: child.nric,
              parentNric: nric,
              dob: new Date(child.date_of_birth),
            },
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
              dob: new Date(child.date_of_birth),
            },
          })
        }),
      )
    }

    return parentUser
  })
}
