import { Prisma } from '@prisma/client'
import { z } from 'zod'
export const defaultNoteSelect = Prisma.validator<Prisma.NoteSelect>()({
  id: true,
  content: true,
  contentHtml: true,
  createdAt: true,
  updatedAt: true,
  authorId: true,
  trigger: true,
  isRead: true,
  author: {
    select: {
      nric: true,
      name: true,
      isDead: true,
    },
  },
  recipient: {
    select: {
      nric: true,
      name: true,
      mobile: true,
    },
  },
})

export const listNotesInputSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.string().nullish(),
})
