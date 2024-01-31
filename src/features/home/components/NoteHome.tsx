import { Flex, Skeleton, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Suspense from '~/components/Suspense'
import { AddNewNote } from '~/features/notes/components/AddNewNote'
import { MyNoteList } from '~/features/notes/components/MyNoteList'
import { NoteReceived } from '~/features/notes/components/NoteReceived'
import { UnreadModal } from '~/features/notes/components/UnreadModal'
import { trpc } from '~/utils/trpc'
import { NoteTabs } from './NoteTabs'

const MODAL_SHOWN_KEY = 'modalShown'

export const NoteHome = (): JSX.Element => {
  const [tabNumber, setTabNumber] = useState(1)
  const [unreadNotes] = trpc.note.listUnread.useSuspenseQuery()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [createdNotes] = trpc.note.listCreated.useSuspenseQuery({})
  useEffect(() => {
    const modalShown = localStorage.getItem(MODAL_SHOWN_KEY) === 'true'
    if (unreadNotes.items[0] && !modalShown) {
      onOpen()
      localStorage.setItem(MODAL_SHOWN_KEY, 'true')
    }
  }, [unreadNotes, onOpen])
  return (
    <Suspense fallback={<Skeleton height="100vh" />}>
      <Flex
        padding="2rem 0rem"
        flexDirection="column"
        alignItems="center"
        gap="1.5rem"
        justifyContent="center"
        width="full"
      >
        <NoteTabs
          tabNumber={tabNumber}
          setTabNumber={setTabNumber}
          numUnread={unreadNotes.items.length}
        />
        {tabNumber === 1 ? (
          <Flex
            flexDirection={
              createdNotes.items.length == 0 ? 'column-reverse' : 'column'
            }
            alignItems="center"
            gap="1.5rem"
            justifyContent="center"
            width="full"
          >
            <AddNewNote />
            <MyNoteList createdNotes={createdNotes} />
          </Flex>
        ) : (
          <NoteReceived />
        )}
      </Flex>
      {unreadNotes.items[0] && (
        <UnreadModal
          isOpen={isOpen}
          onClose={onClose}
          note={unreadNotes.items[0]}
        />
      )}
    </Suspense>
  )
}
