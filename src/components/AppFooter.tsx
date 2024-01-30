import { RestrictedFooter } from '@opengovsg/design-system-react'
import { FOOTER_LINKS } from '~/constants/footer'
export const AppFooter = () => {
  return (
    <RestrictedFooter
      // This component can only be used if this is an application created by OGP.
      containerProps={{
        px: 0,
      }}
      appName="eNotes"
      appLink="/"
      footerLinks={FOOTER_LINKS}
    />
  )
}
