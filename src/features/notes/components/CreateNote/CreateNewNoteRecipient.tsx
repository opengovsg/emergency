import { Input, Stack, Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { type ClientAddNoteSchema } from '../../schemas/addNoteSchema'
import { FormErrorMessage } from '@chakra-ui/react'
interface CreateNewNoteRecipientProps
  extends UseFormReturn<ClientAddNoteSchema> {
  handleNext: () => void
}

export const CreateNewNoteRecipient = ({
  handleNext,
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
      <Stack width="19.5rem" alignItems="flex-start" gap="1rem">
        <Text textStyle="h6">Who are you sending this emergency note to?</Text>
        <Text textStyle="body-2">
          Please choose the intended recipient for your note from the dropdown
          menu below to ensure it reaches the right person.
        </Text>
      </Stack>
      <Stack width="19.5rem" alignItems="flex-start" gap="0.5rem">
        <Text textStyle="subhead-1">Message recipient</Text>
        <Controller
          name="nric"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <>
              <Input
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
      </Stack>
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
