import { Image, Stack, Text } from '@chakra-ui/react'
export const EmptyMyNoteList = () => {
  return (
    <Stack>
      <Image src="/assets/Empty-MyNotes.svg" alt="Empty Notes Received" />
      <Stack gap="0.25rem" justifyContent="center" alignItems="center">
        <Text textStyle="subhead-1">No notes written ... yet</Text>
        <Text textStyle="body-2" textAlign="center">
          Start writing a note and send it to your loved ones today.
        </Text>
      </Stack>
    </Stack>
  )
}
