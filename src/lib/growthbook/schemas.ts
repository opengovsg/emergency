import { z } from 'zod'

const bannerValidationSchema = z.object({
  variant: z.enum(['info', 'error', 'warn']),
  message: z.string(),
})

export const APP_FEATURES = {
  banner: bannerValidationSchema,
} as const

export type AppFeatures = {
  [key in keyof typeof APP_FEATURES]: z.infer<(typeof APP_FEATURES)[key]>
}
