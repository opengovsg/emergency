import { Trigger } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { addNoteSchema } from '~/schemas/note'
import { protectedProcedure, router } from '~/server/trpc'
import { sendMessage } from '../postman/postman.service'
import { defaultNoteSelect, listNotesInputSchema } from './note.select'
export const noteRouter = router({
  listCreated: protectedProcedure
    .input(listNotesInputSchema)
    .query(async ({ input, ctx }) => {
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
        orderBy: {
          isRead: 'asc',
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
  listUnread: protectedProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.note.findMany({
      where: {
        recipientNric: ctx.user.nric,
        deletedAt: null,
        isRead: false,
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
    })
    return { items }
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
      if (!note.recipient.mobile) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Note lacks recipient mobile`,
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
        mobile: note.recipient.mobile,
        id: note.id,
        isAuthor: ctx.session?.userId === note.authorId,
        isRead: note.isRead,
      }
      return editedNote
    }),
  add: protectedProcedure
    .input(addNoteSchema)
    .mutation(async ({ input: { nric, mobile, ...input }, ctx }) => {
      return await ctx.prisma.$transaction(async (tx) => {
        let note
        if (input.id) {
          // Perform upsert if id is defined
          note = await tx.note.upsert({
            where: { id: input.id },
            update: {
              ...input,
              recipient: {
                connectOrCreate: {
                  create: { nric, mobile },
                  where: { nric },
                },
              },
            },
            create: {
              ...input,
              author: { connect: { id: ctx.user.id } },
              recipient: {
                connectOrCreate: {
                  create: { nric, mobile },
                  where: { nric },
                },
              },
            },
            include: {
              author: true,
              recipient: true,
            },
          })
        } else {
          // Perform create if id is undefined
          note = await tx.note.create({
            data: {
              ...input,
              author: { connect: { id: ctx.user.id } },
              recipient: {
                connectOrCreate: {
                  create: { nric, mobile },
                  where: { nric },
                },
              },
            },
            include: {
              author: true,
              recipient: true,
            },
          })
        }
        await tx.user.update({
          where: { nric },
          data: { mobile },
        })
        if (note.trigger === Trigger.IMMEDIATE && note.recipient.mobile) {
          await sendMessage(
            note.recipient.mobile,
            note.recipient.name,
            note.recipient.nric,
            note.author.name,
            note.author.nric,
          )
        }
        return note
      })
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
  read: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const noteToUpdate = await ctx.prisma.note.findUnique({
        where: { id },
        select: defaultNoteSelect,
      })
      if (!noteToUpdate) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No note with id '${id}'`,
        })
      }
      if (noteToUpdate?.recipient.nric !== ctx.user.nric) {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }
      const note = await ctx.prisma.note.update({
        where: { id },
        data: {
          isRead: true,
        },
      })

      return note
    }),
})
