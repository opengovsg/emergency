import { z } from 'zod'
import { Trigger } from '@prisma/client'
import { isMFinSeriesValid, isNricValid } from '~/utils/nric-validation'
export const addNoteSchema = z.object({
  nric: z
    .string()
    .min(1)
    .refine(
      (value) => {
        return isNricValid(value) || isMFinSeriesValid(value)
      },
      {
        message: 'NRIC is Invalid',
      },
    ),
  content: z.string().min(1),
  contentHtml: z.string().min(1),
  trigger: z.nativeEnum(Trigger),
  id: z.string().optional(),
})

export type AddPostSchema = z.infer<typeof addNoteSchema>
