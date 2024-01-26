import { Trigger } from '@prisma/client'
import { z } from 'zod'
import { isMobilePhoneNumber } from '~/lib/phone'
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
  mobile: z
    .string()
    .refine((s) => isMobilePhoneNumber(s), { message: 'Number is invalid' }),
  content: z.string().min(1),
  contentHtml: z.string().min(1),
  trigger: z.nativeEnum(Trigger),
  id: z.string().optional(),
})

export type AddPostSchema = z.infer<typeof addNoteSchema>
