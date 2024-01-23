import { z } from 'zod'
import { Trigger } from '@prisma/client'
export const addNoteSchema = z.object({
  nric: z.string().min(1),
  content: z.string().min(1),
  contentHtml: z.string().min(1),
  trigger: z.nativeEnum(Trigger),
})

export type AddPostSchema = z.infer<typeof addNoteSchema>
