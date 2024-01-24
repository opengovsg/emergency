import { Flex } from '@chakra-ui/react'
import { SkeletonPostList } from '~/components/SkeletonPostList'
import {
  ADMIN_NAVBAR_HEIGHT,
  APP_GRID_TEMPLATE_COLUMN,
} from '~/constants/layouts'
import { NoteForm } from '~/features/notes/components/NoteForm/NoteForm'
import { type NextPageWithLayout } from '~/lib/types'
import { AppGrid } from '~/templates/AppGrid'
import { AdminLayout } from '~/templates/layouts/AdminLayout'

const CreateNote: NextPageWithLayout = () => {
  return (
    <Flex
      w="100%"
      flexDir="column"
      position={{ base: 'absolute', sm: 'inherit' }}
      left={{ base: 0, sm: undefined }}
      minH={`calc(100% - ${ADMIN_NAVBAR_HEIGHT})`}
    >
      <AppGrid
        flex={1}
        bg="white"
        pb="2.5rem"
        templateColumns={APP_GRID_TEMPLATE_COLUMN}
        px={{ base: '1rem', lg: 0 }}
        alignItems="flex-start"
      >
        <NoteForm />
      </AppGrid>
    </Flex>
  )
}

CreateNote.getLayout = AdminLayout

export default CreateNote
