import { Banner as BannerComponent } from '@opengovsg/design-system-react'

import { useFeatureValue } from '~/lib/growthbook/client'

export const AppBanner = () => {
  const bannerFeature = useFeatureValue('banner', {
    message:
      'eNotes is a work-in-progress Hackathon project for OGP’s Hack for Public Good.',
    variant: 'info',
  })

  const { message, variant } = bannerFeature
  return (
    <BannerComponent key={message} variant={variant}>
      {message}
    </BannerComponent>
  )
}
