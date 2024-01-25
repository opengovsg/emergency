import { Divider, Flex, Icon, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BiPlusCircle } from 'react-icons/bi'

export const AddNewNote = () => {
  const router = useRouter()
  return (
    <Flex
      width="full"
      flexDirection="column"
      alignItems="flex-start"
      gap="1rem"
    >
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        alignSelf="stretch"
        gap="0.5rem"
      >
        <Text textStyle="caption-2" alignSelf="stretch">
          Write a new emergency note
        </Text>
        <Divider color="base.divider.medium" />
      </Flex>
      <Flex
        height="5rem"
        padding="1rem"
        alignItems="center"
        alignSelf="stretch"
        borderRadius="0.25rem"
        backgroundColor="interaction.main.default"
        boxShadow="sm"
        justifyContent="center"
        cursor="pointer"
        onClick={() => router.push('/create-note')}
      >
        <Icon
          as={BiPlusCircle}
          width="24px"
          height="24px"
          color="interaction.main-subtle.default"
        />
      </Flex>
    </Flex>
  )
}
