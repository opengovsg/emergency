/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc'
import { meRouter } from './me/me.router'
import { authRouter } from './auth/auth.router'
import { noteRouter } from './note/note.router'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  me: meRouter,
  auth: authRouter,
  note: noteRouter,
})

export type AppRouter = typeof appRouter
