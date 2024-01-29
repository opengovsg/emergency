/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { z } from 'zod'
import { protectedProcedure, publicProcedure, router } from '~/server/trpc'
import { sendMessage } from '../postman/postman.service'
import { childrenMeSelect } from './me.select'

export const meRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUniqueOrThrow({
      where: { id: ctx.user.id },
      select: childrenMeSelect,
    })
  }),
  // to remove when go live
  killUser: publicProcedure
    .input(
      z.object({
        nrics: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input: { nrics } }) => {
      return await ctx.prisma.$transaction(async (tx) => {
        const usersToUpdate = await tx.user.findMany({
          where: {
            nric: {
              in: nrics,
            },
          },
        })

        // Update the 'isDead' field for each user
        await Promise.all(
          usersToUpdate.map((user) =>
            tx.user.update({
              where: { id: user.id },
              data: { isDead: true },
            }),
          ),
        )
      })
    }),
  sendDeceasedAuthorNotes: publicProcedure
    .input(
      z.object({
        nrics: z.array(z.string()),
      }),
    )
    .query(async ({ ctx, input: { nrics } }) => {
      const notes = await ctx.prisma.note.findMany({
        where: {
          author: {
            nric: {
              in: nrics,
            },
            isDead: true,
          },
        },
        include: {
          author: true, // include author details if needed
          recipient: true,
        },
      })
      await Promise.all(
        notes.map(async (note) => {
          if (note.recipient.mobile) {
            await sendMessage(
              note.recipient.mobile,
              note.recipient.name,
              note.recipient.nric,
              note.author.name,
              note.author.nric,
            )
          }
        }),
      )
      return notes
    }),
})
