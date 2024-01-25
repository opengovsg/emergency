import { type GrowthBook } from '@growthbook/growthbook'

import { type Logger } from '~/lib/logger'
import { APP_FEATURES, type AppFeatures } from './schemas'

export async function isFeatureOn(
  gb: GrowthBook<AppFeatures>,
  logger: Logger,
  feature: keyof AppFeatures,
  fallback = false,
) {
  try {
    await gb.loadFeatures()
  } catch (error) {
    logger.error(
      {
        feature,
        error,
      },
      'Failed to load features from GrowthBook',
    )
    return fallback
  }
  return gb.isOn(feature)
}

export async function retrieveFeatureValue<T extends keyof AppFeatures>(
  gb: GrowthBook<AppFeatures>,
  logger: Logger,
  feature: T,
  fallback: AppFeatures[T],
): Promise<AppFeatures[T]> {
  try {
    await gb.loadFeatures()
  } catch (error) {
    logger.error(
      {
        feature,
        error,
      },
      'Failed to load features from GrowthBook',
    )
    return fallback
  }
  const value = gb.getFeatureValue(feature, fallback)
  const schema = APP_FEATURES[feature]
  const parse = schema.safeParse(value)
  if (!parse.success) {
    logger.error(
      {
        feature,
        error: parse.error,
      },
      'Failed to load features from GrowthBook',
    )
    return fallback
  }
  return parse.data as AppFeatures[T]
}
