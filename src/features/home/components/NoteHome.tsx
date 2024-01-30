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
  const [data] = trpc.note.listUnread.useSuspenseQuery()
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    const modalShown = localStorage.getItem(MODAL_SHOWN_KEY) === 'true'
    if (data.items[0] && !modalShown) {
      onOpen()
      localStorage.setItem(MODAL_SHOWN_KEY, 'true')
    }
  }, [data, onOpen])
  return (
    <Suspense fallback={<Skeleton width="100vw" height="100vh" />}>
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
          numUnread={data.items.length}
        />
        {tabNumber === 1 ? (
          <>
            <AddNewNote />
            <MyNoteList />
          </>
        ) : (
          <NoteReceived />
        )}
      </Flex>
      {data.items[0] && (
        <UnreadModal isOpen={isOpen} onClose={onClose} note={data.items[0]} />
      )}
    </Suspense>
  )
}
