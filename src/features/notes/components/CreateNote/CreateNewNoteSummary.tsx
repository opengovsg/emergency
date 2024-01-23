import { Stack, Text, Button, Flex } from '@chakra-ui/react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { type ClientAddNoteSchema } from '../../schemas/addNoteSchema'
import { RichText } from '~/components/RichText'
import { Trigger } from '@prisma/client'
interface CreateNewNoteSummaryProps
  extends UseFormReturn<ClientAddNoteSchema> {}
export const CreateNewNoteSummary = ({
  ...props
}: CreateNewNoteSummaryProps) => {
  const { handleSubmit, watch } = props
  const formData = watch()
  return (
    <Stack
      px="1.5rem"
      pb="2rem"
      alignItems="flex-start"
      gap="2rem"
      alignSelf="stretch"
    >
      <Stack width="19.5rem" alignItems="flex-start" gap="1rem">
        <Text textStyle="h6">Review your emergency note</Text>
        <Text textStyle="body-2">
          Once you save your note, it will be encrypted and stored securely. We
          will send this note to your designated contact upon your passing.
        </Text>
        <Text textStyle="body-2">
          Learn more about how your notes are encrypted and stored securely.
        </Text>
      </Stack>
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
              <Text textStyle="subhead-1">{formData.nric}</Text>
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
                {formData.trigger === Trigger.DEATH
                  ? 'Upon my passing'
                  : 'Immediately'}
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
          <RichText
            width="17.5rem"
            defaultValue={formData?.contentHtml}
            isReadOnly
          />
        </Stack>
      </Stack>
      <Stack alignItems="center" gap="0.5rem" alignSelf="stretch">
        <Button width="19.5rem" alignItems="flex-start">
          Save and schedule note
        </Button>
        <Button
          width="19.5rem"
          colorScheme="neutral"
          variant="clear"
          alignItems="center"
        >
          Edit note
        </Button>
      </Stack>
    </Stack>
  )
}
