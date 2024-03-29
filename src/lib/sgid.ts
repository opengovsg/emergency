import SgidClient, { type SgidClientParams } from '@opengovsg/sgid-client'
import { env } from '~/env.mjs'
import { getBaseUrl } from '~/utils/getBaseUrl'
/**
 * Update if you need to change the scope of the sgID request. \
 * Remember to also update the scope in sgID's developer portal:
 * https://developer.id.gov.sg/dashboard.
 */
export const APP_SGID_SCOPE = [
  'openid',
  'myinfo.name',
  'myinfo.nric_number',
  'myinfo.date_of_birth',
  'myinfo.mobile_number',
  'myinfo.children_birth_records',
  'myinfo.sponsored_children_records',
]

const sgidOptions = {
  clientId: env.SGID_CLIENT_ID,
  clientSecret: env.SGID_CLIENT_SECRET,
  privateKey: env.SGID_PRIVATE_KEY,
  // Client requires at least a default uri to be registered
  redirectUri:
    env.SGID_REDIRECT_URI ??
    new URL('/sign-in/sgid/callback', getBaseUrl()).href,
} as SgidClientParams

export const sgid = env.NEXT_PUBLIC_ENABLE_SGID
  ? new SgidClient(sgidOptions)
  : null
