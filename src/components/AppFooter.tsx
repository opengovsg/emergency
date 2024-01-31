import { Box } from '@chakra-ui/react'
import { RestrictedFooter } from '@opengovsg/design-system-react'
import { FOOTER_LINKS } from '~/constants/footer'
import { AppGrid } from '~/templates/AppGrid'
export const AppFooter = () => {
  return (
    <AppGrid bg="base.canvas.brand-subtle" px="1.5rem">
      <Box gridColumn={{ base: '1 / -1', md: '2 / 12' }}>
        <RestrictedFooter
          // This component can only be used if this is an application created by OGP.
          containerProps={{
            px: 0,
          }}
          appName="eNotes"
          appLink="/"
          footerLinks={FOOTER_LINKS}
        />
      </Box>
    </AppGrid>
  )
}
