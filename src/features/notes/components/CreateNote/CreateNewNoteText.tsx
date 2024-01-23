import { Controller, type UseFormReturn } from 'react-hook-form'
import { RichText } from '~/components/RichText'
import { Stack, Text, Button } from '@chakra-ui/react'
import { FormErrorMessage } from '@chakra-ui/react'
import { type ClientAddNoteSchema } from '../../schemas/addNoteSchema'

interface CreateNewNoteTextProps extends UseFormReturn<ClientAddNoteSchema> {
  handleNext: () => void
}

export const CreateNewNoteText = ({
  handleNext,
  ...props
}: CreateNewNoteTextProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = props

  return (
    <Stack
      px="1.5rem"
      pb="2rem"
      alignItems="flex-start"
      gap="2rem"
      alignSelf="stretch"
    >
      <Stack width="19.5rem" alignItems="flex-start" gap="1rem">
        <Text textStyle="h6">What do you want to say?</Text>
        <Text textStyle="body-2">
          Leave your essential thoughts and instructions here. This space is for
          the messages you want shared in case of an unforeseen event.
        </Text>
      </Stack>
      <Controller
        control={control}
        name="contentHtml"
        render={({ field: { onChange, ...field } }) => (
          <RichText
            width="19.5rem"
            {...field}
            onChange={(value, rawValue) => {
              onChange(value)
              setValue('content', rawValue ?? '')
            }}
          />
        )}
      />
      <FormErrorMessage>{errors.contentHtml?.message}</FormErrorMessage>
      <Stack alignItems="center" gap="0.5rem" alignSelf="stretch">
        <Button width="19.5rem" alignItems="flex-start" onClick={handleNext}>
          Next
        </Button>
        <Button
          width="19.5rem"
          colorScheme="neutral"
          variant="clear"
          alignItems="center"
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  )
}
