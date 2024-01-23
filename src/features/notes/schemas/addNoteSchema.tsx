import { type z } from 'zod'
import { type addNoteSchema } from '~/schemas/note'

export type ClientAddNoteSchema = z.infer<typeof addNoteSchema>
