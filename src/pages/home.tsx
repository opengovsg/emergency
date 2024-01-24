import { Flex } from '@chakra-ui/react'
import { SkeletonPostList } from '~/components/SkeletonPostList'
import Suspense from '~/components/Suspense'
import {
  ADMIN_NAVBAR_HEIGHT,
  APP_GRID_TEMPLATE_COLUMN,
} from '~/constants/layouts'
import { NoteHome } from '~/features/home/components/NoteHome'
import { DefaultBanner } from '~/features/home/components/DefaultBanner'
import { type NextPageWithLayout } from '~/lib/types'
import { AppGrid } from '~/templates/AppGrid'
import { AdminLayout } from '~/templates/layouts/AdminLayout'

const Home: NextPageWithLayout = () => {
  return (
    <Flex
      w="100%"
      flexDir="column"
      position={{ base: 'absolute', sm: 'inherit' }}
      left={{ base: 0, sm: undefined }}
      minH={`calc(100% - ${ADMIN_NAVBAR_HEIGHT})`}
    >
      <AppGrid
        templateColumns={APP_GRID_TEMPLATE_COLUMN}
        px={{ base: '1rem', lg: 0 }}
        bg="white"
        py="1rem"
      >
        <DefaultBanner />
      </AppGrid>
      <AppGrid
        flex={1}
        bg="white"
        pb="2.5rem"
        templateColumns={APP_GRID_TEMPLATE_COLUMN}
        px={{ base: '1rem', lg: 0 }}
        alignItems="flex-start"
      >
        <Suspense fallback={<SkeletonPostList />}>
          <NoteHome />
        </Suspense>
      </AppGrid>
    </Flex>
  )
}

Home.getLayout = AdminLayout

export default Home
