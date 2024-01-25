import { Flex, Stack } from '@chakra-ui/react'
import {
  ADMIN_NAVBAR_HEIGHT,
  APP_GRID_COLUMN,
  APP_GRID_TEMPLATE_COLUMN,
} from '~/constants/layouts'
import { NoteForm } from '~/features/notes/components/NoteForm/NoteForm'
import { type NextPageWithLayout } from '~/lib/types'
import { AppGrid } from '~/templates/AppGrid'
import { AdminLayout } from '~/templates/layouts/AdminLayout'
import { RestrictedFooter } from '@opengovsg/design-system-react'
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
        <Stack gridColumn={APP_GRID_COLUMN}>
          <NoteForm />
        </Stack>
      </AppGrid>
      <RestrictedFooter appLink="" appName="" />
    </Flex>
  )
}

CreateNote.getLayout = AdminLayout

export default CreateNote
