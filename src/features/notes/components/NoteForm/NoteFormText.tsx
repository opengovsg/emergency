import {
  Button,
  FormControl,
  FormErrorMessage,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { RichText } from '~/components/RichText'
import { type ClientAddNoteSchema } from '../../schemas/addNoteSchema'
interface NoteFormTextProps extends UseFormReturn<ClientAddNoteSchema> {
  handleNext: () => void
  handleCancel: () => void
}

export const NoteFormText = ({
  handleNext,
  handleCancel,
  ...props
}: NoteFormTextProps) => {
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
      <Stack width="full" alignItems="flex-start" gap="1rem">
        <Text textStyle="h6">What do you want to say?</Text>
        <Text textStyle="body-2">
          Leave your essential thoughts and instructions here. This space is for
          the messages you want shared in case of an unforeseen event.
        </Text>
      </Stack>
      <FormControl isInvalid={!!errors.contentHtml}>
        <Controller
          control={control}
          name="contentHtml"
          render={({ field: { onChange, ...field } }) => (
            <RichText
              width="full"
              {...field}
              onChange={(value, rawValue) => {
                onChange(value)
                setValue('content', rawValue ?? '')
              }}
            />
          )}
        />
        <FormErrorMessage>{errors.contentHtml?.message}</FormErrorMessage>
      </FormControl>
      <Stack alignItems="center" gap="0.5rem" alignSelf="stretch">
        <Button
          width="full"
          alignItems="center"
          onClick={handleNext}
          height="3.5rem"
        >
          Next
        </Button>
        <Button
          width="full"
          colorScheme="neutral"
          variant="clear"
          alignItems="center"
          onClick={handleCancel}
          height="3.5rem"
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  )
}
