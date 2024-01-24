import { Divider, Stack, Text } from '@chakra-ui/react'
import { NoteView } from '../Note'
import Suspense from '~/components/Suspense'
import { SkeletonNoteView } from '../Note/SkeletonNoteView'
import { trpc } from '~/utils/trpc'
import { EmptyNoteReceived } from './EmptyNoteReceived'
export const NoteReceived = () => {
  const [data] = trpc.note.listReceived.useSuspenseQuery({})
  if (data.items.length === 0) {
    return <EmptyNoteReceived />
  }
  return (
    <Stack w="19.5rem" alignItems="flex-start" gap="1rem">
      <Stack alignItems="flex-start" gap="0.5rem" alignSelf="stretch">
        <Text textStyle="caption-2">View notes that {"you've"} received</Text>
        <Divider />
      </Stack>
      <Suspense fallback={<SkeletonNoteView />}>
        {data.items.map((note) => (
          <NoteView key={note.id} note={note} isViewOnly={true} />
        ))}
      </Suspense>
    </Stack>
  )
}
