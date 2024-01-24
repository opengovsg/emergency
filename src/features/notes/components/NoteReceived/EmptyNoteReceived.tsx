import { Stack, Text } from '@chakra-ui/react'

export const EmptyNoteReceived = () => {
  return (
    <Stack width="19.5rem" alignItems="flex-start" gap="1rem">
      <Stack
        py="1.5rem"
        alignItems="flex-start"
        gap="0.5rem"
        alignSelf="stretch"
        borderRadius="0.25rem"
      >
        <Text textStyle="body-2" fontStyle="italic">
          You {"haven't"} receive any notes.
        </Text>
      </Stack>
    </Stack>
  )
}
