import nric from 'nric'
import { z } from 'zod'
import { sgid } from '~/lib/sgid'
import { safeSchemaJsonParse } from '~/utils/zod'

const childrenBirthRecordsSchema = z.array(
  z.object({
    birth_cert_no: z.string(),
    name: z.string().optional(),
    date_of_birth: z.string().optional(),
    life_status: z.string().optional(),
  }),
)

const sponsoredChildrenRecordsSchema = z.array(
  z.object({
    nric: z.string(),
    name: z.string().optional(),
    date_of_birth: z.string().optional(),
    life_status: z.string().optional(),
  }),
)

const expectedUserInfo = z.object({
  sub: z.string(),
  data: z.object({
    'myinfo.name': z.string(),
    'myinfo.nric_number': z.string().refine((val) => nric.validate(val)),
    'myinfo.children_birth_records': z.string().transform((value, ctx) => {
      const result = safeSchemaJsonParse(childrenBirthRecordsSchema, value)
      if (!result.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: result.error.message,
        })
        return z.NEVER
      }
      return result.data
    }),
    'myinfo.sponsored_children_records': z.string().transform((value, ctx) => {
      const result = safeSchemaJsonParse(sponsoredChildrenRecordsSchema, value)
      if (!result.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: result.error.message,
        })
        return z.NEVER
      }
      return result.data
    }),
  }),
})
export type SgidUserInfo = z.infer<typeof expectedUserInfo>

export const sgidSessionProfileSchema = z.object({
  name: expectedUserInfo.shape.data.shape['myinfo.name'],
  nric: expectedUserInfo.shape.data.shape['myinfo.nric_number'],
  children: childrenBirthRecordsSchema,
  sponsoredChildren: sponsoredChildrenRecordsSchema,
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
