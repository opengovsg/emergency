import { Flex, Stack, Button, Text, Skeleton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BackBanner } from '~/components/BackBanner'
import { APP_GRID_TEMPLATE_COLUMN } from '~/constants/layouts'
import { type NextPageWithLayout } from '~/lib/types'
import { AppGrid } from '~/templates/AppGrid'
import { NoteLayout } from '~/templates/layouts/NoteLayout'
import { trpc } from '~/utils/trpc'
import { FullNote } from '~/features/notes/components/Note/FullNote'
import { DeleteNoteModal } from '~/features/notes/components/DeleteNoteModal'
import { useDisclosure } from '@chakra-ui/react'
import { EDIT_NOTE } from '~/lib/routes'
import Suspense from '~/components/Suspense'
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
          px={{ base: '1rem', lg: 0 }}
        >
          <BackBanner />
        </AppGrid>
        <AppGrid
          flex={1}
          bg="white"
          pb="2.5rem"
          templateColumns={APP_GRID_TEMPLATE_COLUMN}
          px={{ base: '1rem', lg: 0 }}
        >
          <Stack alignItems="center" gap="2rem">
            <FullNote
              nric={data.nric}
              trigger={data.trigger}
              contentHtml={data.contentHtml}
            />
            {data.isAuthor ? (
              <Stack alignItems="center" gap="0.5rem" alignSelf="stretch">
                <Button
                  width="19.5rem"
                  alignItems="flex-start"
                  onClick={() => router.push(`${EDIT_NOTE}/${noteId}`)}
                >
                  <Text textStyle="subhead-2">Edit note</Text>
                </Button>
                <Button
                  width="19.5rem"
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
      </Flex>
    </Suspense>
  )
}

NotePage.getLayout = NoteLayout

export default NotePage
