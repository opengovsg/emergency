import { Trigger } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { addNoteSchema } from '~/schemas/note'
import { protectedProcedure, router } from '~/server/trpc'
import { defaultNoteSelect, listNotesInputSchema } from './note.select'

export const noteRouter = router({
  listCreated: protectedProcedure
    .input(listNotesInputSchema)
    .query(async ({ input, ctx }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 50
      const { cursor } = input

      const items = await ctx.prisma.note.findMany({
        where: {
          authorId: ctx.user.id,
          deletedAt: null,
        },
        select: defaultNoteSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
      })
      let nextCursor: typeof cursor | null = null
      if (items.length > limit) {
        // Remove the last item and use it as next cursor
        const nextItem = items.pop()!
        nextCursor = nextItem.id
      }

      return {
        items,
        nextCursor,
      }
    }),
  listReceived: protectedProcedure
    .input(listNotesInputSchema)
    .query(async ({ input, ctx }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 50
      const { cursor } = input

      const items = await ctx.prisma.note.findMany({
        where: {
          recipientNric: ctx.user.nric,
          deletedAt: null,
          OR: [
            {
              trigger: Trigger.DEATH,
              author: {
                isDead: true,
              },
            },
            {
              trigger: Trigger.IMMEDIATE,
            },
          ],
        },
        select: defaultNoteSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
      })
      let nextCursor: typeof cursor | null = null
      if (items.length > limit) {
        // Remove the last item and use it as next cursor
        const nextItem = items.pop()!
        nextCursor = nextItem.id
      }

      return {
        items,
        nextCursor,
      }
    }),
  byId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { id } = input
      const note = await ctx.prisma.note.findFirst({
        where: { id, deletedAt: null },
        select: defaultNoteSelect,
      })
      if (!note) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No note with id '${id}'`,
        })
      }
      if (
        note.authorId !== ctx.user.id &&
        note.recipient.nric !== ctx.user.nric
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not authorised to view this note',
        })
      }
      if (
        note.recipient.nric === ctx.user.nric &&
        note.authorId !== ctx.user.id &&
        note.trigger === Trigger.DEATH &&
        !note.author.isDead
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not authorised to view this note',
        })
      }
      const editedNote = {
        recipientNric: note.recipient.nric,
        authorNric: note.author.nric,
        trigger: note.trigger,
        content: note.content,
        contentHtml: note.contentHtml,
        id: note.id,
        isAuthor: ctx.session?.userId === note.authorId,
      }
      return editedNote
    }),
  add: protectedProcedure
    .input(addNoteSchema)
    .mutation(async ({ input: { nric, ...input }, ctx }) => {
      let note
      if (input.id) {
        // Perform upsert if id is defined
        note = await ctx.prisma.note.upsert({
          where: { id: input.id },
          update: {
            ...input,
            recipient: {
              connectOrCreate: {
                create: { nric },
                where: { nric },
              },
            },
          },
          create: {
            ...input,
            author: { connect: { id: ctx.user.id } },
            recipient: {
              connectOrCreate: {
                create: { nric },
                where: { nric },
              },
            },
          },
        })
      } else {
        // Perform create if id is undefined
        note = await ctx.prisma.note.create({
          data: {
            ...input,
            author: { connect: { id: ctx.user.id } },
            recipient: {
              connectOrCreate: {
                create: { nric },
                where: { nric },
              },
            },
          },
        })
      }
      return note
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const noteToDelete = await ctx.prisma.note.findUnique({
        where: { id },
        select: defaultNoteSelect,
      })
      if (!noteToDelete) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No note with id '${id}'`,
        })
      }
      if (noteToDelete?.authorId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }
      const note = await ctx.prisma.note.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      })

      return note
    }),
})
