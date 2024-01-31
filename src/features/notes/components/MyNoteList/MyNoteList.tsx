import { Divider, Flex, Text } from '@chakra-ui/react'
import Suspense from '~/components/Suspense'
import { type RouterOutput } from '~/utils/trpc'
import { NoteView } from '../Note'
import { SkeletonNoteView } from '../Note/SkeletonNoteView'
import { EmptyMyNoteList } from './EmptyMyNoteList'
interface MyNoteListProps {
  createdNotes: RouterOutput['note']['listCreated']
}

export const MyNoteList = ({ createdNotes }: MyNoteListProps) => {
  if (createdNotes.items.length == 0) {
    return <EmptyMyNoteList />
  }
  return (
    <Flex
      width="full"
      gap="1rem"
      alignItems="flex-start"
      flexDirection="column"
    >
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        gap="1rem"
        alignSelf="stretch"
      >
        <Divider color="base.divider.subtle" />
        <Text textStyle="caption-2">
          Scheduled & Sent Notes ({createdNotes.items.length})
        </Text>
        <Suspense fallback={<SkeletonNoteView />}>
          {createdNotes.items.map((note) => (
            <NoteView key={note.id} note={note} />
          ))}
        </Suspense>
      </Flex>
    </Flex>
  )
}
