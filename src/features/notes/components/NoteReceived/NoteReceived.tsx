import { Divider, Stack } from '@chakra-ui/react'
import Suspense from '~/components/Suspense'
import { trpc } from '~/utils/trpc'
import { NoteView } from '../Note'
import { SkeletonNoteView } from '../Note/SkeletonNoteView'
import { EmptyNoteReceived } from './EmptyNoteReceived'

export const NoteReceived = () => {
  const [data] = trpc.note.listReceived.useSuspenseQuery({})
  if (data.items.length === 0) {
    return <EmptyNoteReceived />
  }
  return (
    <Stack w="full" alignItems="flex-start" gap="1rem">
      <Divider />
      <Suspense fallback={<SkeletonNoteView />}>
        {data.items.map((note) => (
          <NoteView key={note.id} note={note} isViewOnly={true} />
        ))}
      </Suspense>
    </Stack>
  )
}
