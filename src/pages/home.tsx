import { Flex, Stack } from '@chakra-ui/react'
import {
  ADMIN_NAVBAR_HEIGHT,
  APP_GRID_COLUMN,
  APP_GRID_TEMPLATE_COLUMN,
} from '~/constants/layouts'
import { NoteHome } from '~/features/home/components/NoteHome'
import { DefaultBanner } from '~/features/home/components/DefaultBanner'
import { type NextPageWithLayout } from '~/lib/types'
import { AppGrid } from '~/templates/AppGrid'
import { AdminLayout } from '~/templates/layouts/AdminLayout'
import { RestrictedFooter } from '@opengovsg/design-system-react'
const Home: NextPageWithLayout = () => {
  return (
    <Flex
      w="100%"
      flexDir="column"
      position={{ base: 'absolute', sm: 'inherit' }}
      left={{ base: 0, sm: undefined }}
      minH={`calc(100% - ${ADMIN_NAVBAR_HEIGHT})`}
    >
      <AppGrid templateColumns={APP_GRID_TEMPLATE_COLUMN} bg="white" py="1rem">
        <Stack gridColumn={APP_GRID_COLUMN}>
          <DefaultBanner />
        </Stack>
      </AppGrid>
      <AppGrid
        flex={1}
        bg="white"
        pb="2.5rem"
        templateColumns={APP_GRID_TEMPLATE_COLUMN}
        px={{ base: '1rem', lg: 0 }}
        alignItems="flex-start"
      >
        <Stack gridColumn={APP_GRID_COLUMN}>
          <NoteHome />
        </Stack>
      </AppGrid>
      <RestrictedFooter appLink="" appName="" />
    </Flex>
  )
}

Home.getLayout = AdminLayout

export default Home
