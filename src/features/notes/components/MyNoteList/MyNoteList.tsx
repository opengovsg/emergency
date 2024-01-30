import { Divider, Flex, Text } from '@chakra-ui/react'
import { trpc } from '~/utils/trpc'
import { NoteView } from '../Note'
import Suspense from '~/components/Suspense'
import { SkeletonNoteView } from '../Note/SkeletonNoteView'
export const MyNoteList = () => {
  const [data] = trpc.note.listCreated.useSuspenseQuery({})
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
        <Text textStyle="caption-2">Your notes ({data.items.length})</Text>
        <Suspense fallback={<SkeletonNoteView />}>
          {data.items.map((note) => (
            <NoteView key={note.id} note={note} />
          ))}
        </Suspense>
      </Flex>
    </Flex>
  )
}
