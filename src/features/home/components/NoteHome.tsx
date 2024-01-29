import { Flex, Skeleton, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Suspense from '~/components/Suspense'
import { AddNewNote } from '~/features/notes/components/AddNewNote'
import { MyNoteList } from '~/features/notes/components/MyNoteList'
import { NoteReceived } from '~/features/notes/components/NoteReceived'
import { UnreadModal } from '~/features/notes/components/UnreadModal'
import { trpc } from '~/utils/trpc'
import { NoteTabs } from './NoteTabs'
export const NoteHome = (): JSX.Element => {
  const [tabNumber, setTabNumber] = useState(1)
  const [data] = trpc.note.listUnread.useSuspenseQuery()
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    if (data.items[0]) {
      onOpen()
    }
  }, [data])
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
          hasUnread={data.items.length > 0}
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
