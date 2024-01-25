import { Flex, Skeleton, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Suspense from '~/components/Suspense'
import {
  ADMIN_NAVBAR_HEIGHT,
  APP_GRID_COLUMN,
  APP_GRID_TEMPLATE_COLUMN,
} from '~/constants/layouts'
import { NoteForm } from '~/features/notes/components/NoteForm/NoteForm'
import { type NextPageWithLayout } from '~/lib/types'
import { AppGrid } from '~/templates/AppGrid'
import { AdminLayout } from '~/templates/layouts/AdminLayout'
import { trpc } from '~/utils/trpc'
const EditNote: NextPageWithLayout = () => {
  const router = useRouter()
  const noteId = String(router.query.noteId)
  const [data] = trpc.note.byId.useSuspenseQuery({
    id: noteId,
  })
  const reformatData = {
    nric: data.recipientNric,
    ...data,
  }
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
          <Suspense fallback={<Skeleton />}>
            <NoteForm note={reformatData} />
          </Suspense>
        </Stack>
      </AppGrid>
    </Flex>
  )
}

EditNote.getLayout = AdminLayout

export default EditNote
