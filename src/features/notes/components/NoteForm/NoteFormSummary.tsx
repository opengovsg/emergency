import { Stack, Text } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { Trigger } from '@prisma/client'
import { type UseFormReturn } from 'react-hook-form'
import { type ClientAddNoteSchema } from '../../schemas/addNoteSchema'
import { FullNote } from '../Note/FullNote'
interface NoteFormSummaryProps extends UseFormReturn<ClientAddNoteSchema> {
  handleSubmitNote: (e: React.BaseSyntheticEvent) => Promise<void>
  handleCancel: () => void
  isLoading: boolean
}

const IMMEDIATE_SUMMARY_HEADER =
  'Once you save your note, it will be encrypted and stored securely. We will send this note to your designated contact immediately. '
const DEATH_SUMMARY_HEADER =
  'Once you save your note, it will be encrypted and stored securely. We will send this note to your designated contact upon your passing.'

export const NoteFormSummary = ({
  handleSubmitNote,
  handleCancel,
  isLoading,
  ...props
}: NoteFormSummaryProps) => {
  const { watch } = props
  const formData = watch()
  return (
    <Stack
      px="1.5rem"
      pb="2rem"
      alignItems="flex-start"
      gap="2rem"
      alignSelf="stretch"
    >
      <Stack width="full" alignItems="flex-start" gap="1rem">
        <Text textStyle="h6">Review your note</Text>
        <Text textStyle="body-2">
          {formData.trigger === Trigger.DEATH
            ? DEATH_SUMMARY_HEADER
            : IMMEDIATE_SUMMARY_HEADER}
        </Text>
        <Text textStyle="body-2">
          Learn more about how your notes are encrypted and stored securely.
        </Text>
      </Stack>
      <FullNote
        nric={formData.nric}
        trigger={formData.trigger}
        contentHtml={formData.contentHtml}
        mobile={formData.mobile}
      />
      <Stack alignItems="center" gap="0.5rem" alignSelf="stretch">
        <Button
          width="full"
          alignItems="center"
          onClick={handleSubmitNote}
          isLoading={isLoading}
          height="3.5rem"
        >
          <Text textStyle="subhead-2">
            {formData.trigger === Trigger.DEATH
              ? 'Save and schedule note'
              : 'Send note immediately'}
          </Text>
        </Button>
        <Button
          width="full"
          colorScheme="neutral"
          variant="clear"
          alignItems="center"
          onClick={handleCancel}
          isDisabled={isLoading}
          height="3.5rem"
        >
          <Text textStyle="subhead-2">Cancel</Text>
        </Button>
      </Stack>
    </Stack>
  )
}
