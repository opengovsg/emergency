import { Text } from '@chakra-ui/react'
import { Banner as BannerComponent, Link } from '@opengovsg/design-system-react'
import { useFeatureValue } from '~/lib/growthbook/client'

export const AppBanner = () => {
  const bannerFeature = useFeatureValue('banner', {
    message: 'eNotes is a work-in-progress Hackathon project for OGP’s ',
    variant: 'info',
  })

  const { message, variant } = bannerFeature
  return (
    <BannerComponent key={message} variant={variant}>
      <Text>
        {message}
        <Link color="white" href="https://hack.gov.sg/about-hfpg/hfpg/">
          Hack for Public Good.
        </Link>
      </Text>
    </BannerComponent>
  )
}
