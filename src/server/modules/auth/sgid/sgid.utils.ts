import nric from 'nric'
import { z } from 'zod'
import { sgid } from '~/lib/sgid'

const expectedUserInfo = z.object({
  sub: z.string(),
  data: z.object({
    'myinfo.name': z.string(),
    'myinfo.nric_number': z.string().refine((val) => nric.validate(val)),
    'myinfo.children_birth_records': z.string(),
    'myinfo.sponsored_children_records': z.string(),
  }),
})
export type SgidUserInfo = z.infer<typeof expectedUserInfo>

export const sgidSessionProfileSchema = z.object({
  name: expectedUserInfo.shape.data.shape['myinfo.name'],
  nric: expectedUserInfo.shape.data.shape['myinfo.nric_number'],
  children: expectedUserInfo.shape.data.shape['myinfo.children_birth_records'],
  sponsoredChildren:
    expectedUserInfo.shape.data.shape['myinfo.sponsored_children_records'],
  sub: expectedUserInfo.shape.sub,
  expiry: z.number(),
})
export type SgidSessionProfile = z.infer<typeof sgidSessionProfileSchema>

export const getUserInfo = async ({
  code,
  codeVerifier,
  nonce,
}: {
  code: string
  codeVerifier: string
  nonce?: string
}) => {
  if (!sgid) {
    throw new Error('SGID is not enabled')
  }

  const { sub, accessToken } = await sgid.callback({
    code,
    nonce,
    codeVerifier,
  })
  const userinfo = await sgid.userinfo({ sub, accessToken })
  return expectedUserInfo.parse(userinfo)
}
