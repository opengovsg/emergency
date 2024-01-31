import { Image, Stack, Text } from '@chakra-ui/react'

export const EmptyNoteReceived = () => {
  return (
    <Stack alignItems="center" p="1rem">
      <Image src="/assets/Empty-NotesReceived.svg" alt="Empty Notes Received" />
      <Stack gap="0.25rem" justifyContent="center" alignItems="center">
        <Text textStyle="body-2" textAlign="center">
          Currently, there are no notes available in your account. Please check
          back later or contact us if you believe this is an error.
        </Text>
      </Stack>
    </Stack>
  )
}
