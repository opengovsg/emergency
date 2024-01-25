import { Banner as BannerComponent } from '@opengovsg/design-system-react'

import { useFeatureValue } from '~/lib/growthbook/client'

export const AppBanner = () => {
  const bannerFeature = useFeatureValue('banner', {
    message: "eNotes is a pilot project from OGP's HFPG 2024 hackathon.",
    variant: 'info',
  })

  const { message, variant } = bannerFeature
  return (
    <BannerComponent key={message} variant={variant}>
      {message}
    </BannerComponent>
  )
}
