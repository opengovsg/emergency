import { publicProcedure, router } from '~/server/trpc'
import { sgidRouter } from './sgid/sgid.router'

export const authRouter = router({
  sgid: sgidRouter,
  logout: publicProcedure.mutation(async ({ ctx }) => {
    ctx.session.destroy()
    return { isLoggedIn: false }
  }),
})
