import { Stack, Text, Flex } from '@chakra-ui/react'
import { Trigger } from '@prisma/client'
import { RichText } from '~/components/RichText'
interface FullNoteProps {
  nric: string
  trigger: Trigger
  contentHtml: string
}

export const FullNote = ({ nric, trigger, contentHtml }: FullNoteProps) => {
  return (
    <Stack alignItems="center" boxShadow="sm">
      <Stack
        p="1rem"
        alignItems="flex-start"
        gap="1rem"
        borderRadius="0.25rem 0.25rem 0rem 0rem"
        background="var(--color-blue-50, #F7F9FE)"
      >
        <Flex
          width="17.5rem"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Stack
            width="17.5rem"
            alignItems="flex-start"
            gap="0.25rem"
            flexShrink="0"
          >
            <Text textColor="base.content.brand" textStyle="legal">
              Message Recipient
            </Text>
            <Text textStyle="subhead-1">{nric}</Text>
          </Stack>
        </Flex>
        <Flex
          width="17.5rem"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Stack
            width="17.5rem"
            alignItems="flex-start"
            gap="0.25rem"
            flexShrink="0"
          >
            <Text textColor="base.content.brand" textStyle="legal">
              Time of Delivery
            </Text>
            <Text textStyle="subhead-1">
              {trigger === Trigger.DEATH ? 'Upon my passing' : 'Immediately'}
            </Text>
          </Stack>
        </Flex>
      </Stack>
      <Stack
        p="1rem"
        alignItems="center"
        gap="0.5rem"
        borderRadius="0rem 0rem 0.25rem 0.25rem"
      >
        <RichText width="17.5rem" defaultValue={contentHtml} isReadOnly />
      </Stack>
    </Stack>
  )
}
