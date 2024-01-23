import { Divider, Flex, Text } from '@chakra-ui/react'
import { trpc } from '~/utils/trpc'
export const MyNoteList = () => {
  const [data] = trpc.note.listCreated.useSuspenseQuery({})
  return (
    <Flex
      width="19.5rem"
      gap="1rem"
      alignItems="flex-start"
      flexDirection="column"
    >
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        gap="0.5rem"
        alignSelf="stretch"
      >
        <Text textStyle="caption-2">Your last notes ({data.items.length})</Text>
        <Divider color="base.divider.subtle" />
      </Flex>
    </Flex>
  )
}
