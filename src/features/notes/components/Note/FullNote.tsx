import { Flex, Stack, Text } from '@chakra-ui/react'
import { Trigger } from '@prisma/client'
import { RichText } from '~/components/RichText'
interface FullNoteProps {
  nric: string
  mobile: string
  trigger: Trigger
  contentHtml: string
  isAuthor?: boolean
}

export const FullNote = ({
  nric,
  mobile,
  trigger,
  contentHtml,
  isAuthor = true,
}: FullNoteProps) => {
  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      boxShadow="sm"
      borderRadius="0rem 0rem 0.25rem 0.25rem"
      width="full"
    >
      <Flex
        width="full"
        flexDir="column"
        p="1rem"
        alignItems="flex-start"
        gap="1rem"
        borderRadius="0.25rem 0.25rem 0rem 0rem"
        bgColor="blue.50"
      >
        <Flex justifyContent="space-between" alignItems="flex-end" width="full">
          <Stack alignItems="flex-start" gap="0.25rem" flexShrink="0">
            <Text textColor="base.content.brand" textStyle="legal">
              {isAuthor ? 'Message Recipient' : 'Message Sender'}
            </Text>
            <Text textStyle="subhead-1">{nric}</Text>
          </Stack>
        </Flex>
        <Flex justifyContent="space-between" alignItems="flex-end" width="full">
          <Stack alignItems="flex-start" gap="0.25rem" flexShrink="0">
            <Text textColor="base.content.brand" textStyle="legal">
              Mobile number
            </Text>
            <Text textStyle="subhead-1">{mobile}</Text>
          </Stack>
        </Flex>
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Stack alignItems="flex-start" gap="0.25rem" flexShrink="0">
            <Text textColor="base.content.brand" textStyle="legal">
              Time of Delivery
            </Text>
            <Text textStyle="subhead-1">
              {trigger === Trigger.DEATH ? 'Upon my passing' : 'Immediately'}
            </Text>
          </Stack>
        </Flex>
      </Flex>
      <Flex
        p="1rem"
        alignItems="center"
        gap="0.5rem"
        borderRadius="0rem 0rem 0.25rem 0.25rem"
        width="full"
      >
        <RichText defaultValue={contentHtml} isReadOnly />
      </Flex>
    </Flex>
  )
}
