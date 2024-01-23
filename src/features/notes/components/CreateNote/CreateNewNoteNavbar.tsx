import { Flex, Icon, Progress, Text } from '@chakra-ui/react'
import { BiArrowBack } from 'react-icons/bi'
interface CreateNewNoteNavbarProps {
  step: number
  handleGoBack: () => void
}
import { MAX_STEPS } from './CreateNewNote'
export const CreateNewNoteNavbar = ({
  step,
  handleGoBack,
}: CreateNewNoteNavbarProps) => {
  return (
    <Flex py="2rem" flexDirection="column" alignItems="flex-start" gap="0.5rem">
      <Flex width="22.5rem" pr="2rem" alignItems="center">
        <Flex alignItems="center" py="0.5rem" px="1rem" justifyContent="center">
          <Icon
            as={BiArrowBack}
            width="20px"
            height="20px"
            cursor="pointer"
            onClick={handleGoBack}
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" flex="1 0 0">
          <Progress
            value={(step / MAX_STEPS) * 100}
            colorScheme="blue"
            width="15rem"
            height="0.25rem"
          />
          <Text textStyle="legal">
            {step}/{MAX_STEPS}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
