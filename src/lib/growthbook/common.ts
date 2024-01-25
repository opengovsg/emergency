import { env } from '~/env.mjs'

export const growthbookParams = {
  apiHost: 'https://cdn.growthbook.io',
  clientKey: env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
  enableDevMode: process.env.NODE_ENV !== 'production',
}
