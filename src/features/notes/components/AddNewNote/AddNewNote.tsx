import { Flex, Icon, Text } from '@chakra-ui/react'
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
        gap="0.5rem"
      >
        <Icon
          as={BiPlusCircle}
          width="24px"
          height="24px"
          color="interaction.main-subtle.default"
        />
        <Text textStyle="subhead-1" textColor="base.content.inverse">
          Write a new note
        </Text>
      </Flex>
    </Flex>
  )
}
