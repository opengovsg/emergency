import {
  generatePkcePair,
  type AuthorizationUrlParams,
} from '@opengovsg/sgid-client'
import { TRPCError } from '@trpc/server'
import { set } from 'lodash'
import { z } from 'zod'
import { env } from '~/env.mjs'
import { HOME } from '~/lib/routes'
import { APP_SGID_SCOPE, sgid } from '~/lib/sgid'
import { publicProcedure, router } from '~/server/trpc'
import { safeSchemaJsonParse } from '~/utils/zod'
import { upsertSgidAccountAndUser } from './sgid.service'
import { getUserInfo, type SgidUserInfo } from './sgid.utils'

const sgidCallbackStateSchema = z.object({
  landingUrl: z.string(),
})

export const sgidRouter = router({
  login: publicProcedure
    .input(
      z.object({
        landingUrl: z.string().default(HOME),
      }),
    )
    .mutation(async ({ ctx, input: { landingUrl } }) => {
      if (!sgid) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'SGID is not enabled',
        })
      }
      if (!ctx.session) {
        // Redirect back to sign in page.
        throw new TRPCError({
          code: 'UNPROCESSABLE_CONTENT',
          message: 'Session object missing in context',
        })
      }

      ctx.logger.info({ landingUrl }, `Starting SGID login flow: ${landingUrl}`)

      const { codeChallenge, codeVerifier } = generatePkcePair()
      const options: AuthorizationUrlParams = {
        codeChallenge,
        state: JSON.stringify({ landingUrl }),
        scope: APP_SGID_SCOPE,
      }
      const { url, nonce } = sgid.authorizationUrl(options)

      // Reset session
      ctx.session.destroy()

      // Store the code verifier and nonce in the session to retrieve in the callback.
      set(ctx.session, 'sgid.sessionState', {
        codeVerifier,
        nonce,
      })
      await ctx.session.save()

      return {
        redirectUrl: url,
      }
    }),
  callback: publicProcedure
    .input(
      z.object({
        state: z.string(),
        code: z.string(),
      }),
    )
    .query(async ({ ctx, input: { state, code } }) => {
      if (!env.NEXT_PUBLIC_ENABLE_SGID) {
        ctx.logger.error('SGID is not enabled')
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'SGID is not enabled',
        })
      }
      if (!ctx.session.sgid?.sessionState) {
        ctx.logger.warn('No sgid session state found')
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid login flow',
        })
      }
      const parsedState = safeSchemaJsonParse(sgidCallbackStateSchema, state)
      if (!parsedState.success) {
        ctx.logger.error(
          { state, error: parsedState.error },
          'Invalid SGID callback state',
        )
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid SGID callback state',
        })
      }

      const { codeVerifier, nonce } = ctx.session.sgid.sessionState
      ctx.session.destroy()
      let sgidUserInfo: SgidUserInfo

      try {
        sgidUserInfo = await getUserInfo({ code, codeVerifier, nonce })
      } catch (error) {
        ctx.logger.warn(
          { state },
          'Unable to fetch user info from sgID',
          (error as Error).message,
        )
        // Redirect back to sign in page with error.
        // TODO: Change this to throw an error instead, and then handle it in the client.
        return {
          redirectUrl: `/sign-in?error=${
            (error as Error).message ||
            'Something went wrong whilst fetching SGID user info'
          }`,
        }
      }

      const user = await upsertSgidAccountAndUser({
        prisma: ctx.prisma,
        name: sgidUserInfo.data['myinfo.name'],
        nric: sgidUserInfo.data['myinfo.nric_number'],
        children: sgidUserInfo.data['myinfo.children_birth_records'],
        sponsoredChildren:
          sgidUserInfo.data['myinfo.sponsored_children_records'],
        sub: sgidUserInfo.sub,
      })

      ctx.session.destroy()
      ctx.session.userId = user.id
      await ctx.session.save()

      return {
        redirectUrl: parsedState.data.landingUrl,
      }
    }),
})
