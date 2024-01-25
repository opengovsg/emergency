import {
  Button,
  Flex,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { RestrictedFooter } from '@opengovsg/design-system-react'
import { useRouter } from 'next/router'
import { BackBanner } from '~/components/BackBanner'
import Suspense from '~/components/Suspense'
import { APP_GRID_COLUMN, APP_GRID_TEMPLATE_COLUMN } from '~/constants/layouts'
import { DeleteNoteModal } from '~/features/notes/components/DeleteNoteModal'
import { FullNote } from '~/features/notes/components/Note/FullNote'
import { EDIT_NOTE } from '~/lib/routes'
import { type NextPageWithLayout } from '~/lib/types'
import { AppGrid } from '~/templates/AppGrid'
import { NoteLayout } from '~/templates/layouts/NoteLayout'
import { trpc } from '~/utils/trpc'
const NotePage: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const noteId = String(router.query.noteId)
  const [data] = trpc.note.byId.useSuspenseQuery({
    id: noteId,
  })
  return (
    <Suspense fallback={<Skeleton />}>
      <Flex w="100%" flexDir="column">
        <AppGrid
          templateColumns={APP_GRID_TEMPLATE_COLUMN}
          bg="white"
          py="1rem"
        >
          <Stack gridColumn="1 / -1">
            <BackBanner />
          </Stack>
        </AppGrid>
        <AppGrid
          flex={1}
          bg="white"
          pb="2.5rem"
          templateColumns={APP_GRID_TEMPLATE_COLUMN}
          px={{ base: '1rem', lg: 0 }}
        >
          <Stack gap="2rem" gridColumn={APP_GRID_COLUMN} spacing="2">
            <FullNote
              nric={data.recipientNric}
              trigger={data.trigger}
              contentHtml={data.contentHtml}
              isAuthor={data.isAuthor}
            />
            {data.isAuthor ? (
              <Stack alignItems="center" gap="0.5rem" alignSelf="stretch">
                <Button
                  width="full"
                  alignItems="flex-start"
                  onClick={() => router.push(`${EDIT_NOTE}/${noteId}`)}
                >
                  <Text textStyle="subhead-2">Edit note</Text>
                </Button>
                <Button
                  width="full"
                  colorScheme="neutral"
                  variant="clear"
                  alignItems="center"
                  onClick={onOpen}
                >
                  <Text textStyle="subhead-2">Delete note</Text>
                </Button>
              </Stack>
            ) : null}
          </Stack>
          <DeleteNoteModal isOpen={isOpen} onClose={onClose} id={noteId} />
        </AppGrid>
        <RestrictedFooter appLink="" appName="" />
      </Flex>
    </Suspense>
  )
}

NotePage.getLayout = NoteLayout

export default NotePage
