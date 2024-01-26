import { z } from 'zod'

export const emptyString = z.string().trim().length(0)

export const sgidFalsyValue = z.union([
  emptyString,
  z.string().refine((value) => value === 'NA'),
])
