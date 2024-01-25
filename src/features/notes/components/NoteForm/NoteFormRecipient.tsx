import { FormControl, Input, Stack, Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { type ClientAddNoteSchema } from '../../schemas/addNoteSchema'
import { FormErrorMessage } from '@chakra-ui/react'
interface CreateNewNoteRecipientProps
  extends UseFormReturn<ClientAddNoteSchema> {
  handleNext: () => void
  handleCancel: () => void
}

export const NoteFormRecipient = ({
  handleNext,
  handleCancel,
  ...props
}: CreateNewNoteRecipientProps) => {
  const {
    control,
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
        <Text textStyle="h6">Who are you sending this emergency note to?</Text>
        <Text textStyle="body-2">
          Please choose the intended recipient for your note from the dropdown
          menu below to ensure it reaches the right person.
        </Text>
      </Stack>
      <Stack width="full" alignItems="flex-start" gap="0.5rem">
        <Text textStyle="subhead-1">Message recipient</Text>
        <FormControl isRequired isInvalid={!!errors.nric}>
          <Controller
            name="nric"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <>
                <Input
                  placeholder="Enter the recipient's NRIC"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                />
                <FormErrorMessage>
                  {errors.nric && errors.nric.message}
                </FormErrorMessage>
              </>
            )}
          />
        </FormControl>
      </Stack>
      <Stack alignItems="center" gap="0.5rem" alignSelf="stretch">
        <Button width="full" alignItems="flex-start" onClick={handleNext}>
          Next
        </Button>
        <Button
          width="full"
          colorScheme="neutral"
          variant="clear"
          alignItems="center"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  )
}
