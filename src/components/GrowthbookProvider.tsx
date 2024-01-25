import { GrowthBookProvider as Provider } from '@growthbook/growthbook-react'
import { useRouter } from 'next/router'
import { useEffect, type PropsWithChildren } from 'react'

import { gb, updateGrowthBookURL } from '~/lib/growthbook/client'

export const GrowthbookProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const router = useRouter()

  useEffect(() => {
    // Load features from the GrowthBook API and keep them up-to-date
    void gb.loadFeatures({ autoRefresh: true })

    // Subscribe to route change events and update GrowthBook
    router.events.on('routeChangeComplete', updateGrowthBookURL)
    return () => router.events.off('routeChangeComplete', updateGrowthBookURL)
  }, [router.events])

  return <Provider growthbook={gb}>{children}</Provider>
}
