import {
  useFeatureIsOn as _useFeatureIsOn,
  useFeatureValue as _useFeatureValue,
  GrowthBook,
} from '@growthbook/growthbook-react'

import { growthbookParams } from './common'
import { APP_FEATURES, type AppFeatures } from './schemas'

// Create a client-side GrowthBook instance
export const gb = new GrowthBook<AppFeatures>(growthbookParams)

// Let the GrowthBook instance know when the URL changes so the active
// experiments can update accordingly
export function updateGrowthBookURL() {
  if (typeof window === 'undefined') {
    return null
  }
  void gb.setURL(window.location.href)
}

export const useFeatureValue = <T extends keyof AppFeatures>(
  id: T,
  fallback: AppFeatures[T],
): AppFeatures[T] => {
  const value = _useFeatureValue(id, fallback)
  const schema = APP_FEATURES[id]
  const parse = schema.safeParse(value)
  if (!parse.success) {
    console.error(
      `Feature flag value for ${id} is invalid: ${parse.error.message}`,
    )
    return fallback
  }
  return parse.data as AppFeatures[T]
}

export const useFeatureIsOn = (id: keyof AppFeatures): boolean =>
  // fallback value is false
  _useFeatureIsOn<AppFeatures>(id)
