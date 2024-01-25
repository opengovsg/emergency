import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { SingleSelect } from '@opengovsg/design-system-react'
import { useState } from 'react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { useMe } from '~/features/me/api'
import { type ClientAddNoteSchema } from '../../schemas/addNoteSchema'
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
    setValue,
    watch,
  } = props
  const watchedNric = watch('nric') // Watch the `nric` field
  const { me } = useMe()
  const hasChildren = me.children && me.children.length > 0
  const isSelected = me.children.some((child) => child.nric === watchedNric)
  const [selectedOption, setSelectedOption] = useState(
    isSelected ? watchedNric : !!watchedNric ? 'other' : '',
  )

  const handleSelectChange = (value: string) => {
    setSelectedOption(value)
    if (value !== 'other') {
      // Update the form value for `nric`
      setValue('nric', value, { shouldValidate: true })
    } else {
      setValue('nric', '')
    }
  }

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
      <FormControl isRequired isInvalid={!!errors.nric}>
        <Stack w="full" gap="1rem">
          {hasChildren && (
            <Stack width="full" alignItems="flex-start" gap="0.5rem">
              <FormLabel>Message recipient</FormLabel>
              <SingleSelect
                isClearable={false}
                items={[
                  ...me.children.map((child) => {
                    return {
                      label: `${child.nric} - ${child.name}`,
                      value: child.nric,
                    }
                  }),
                  { label: 'Other', value: 'other' },
                ]}
                onChange={handleSelectChange}
                value={selectedOption}
                name="Recipient"
              />
            </Stack>
          )}
          <Stack
            w="full"
            gap="0.5rem"
            alignSelf="stretch"
            alignItems="flex-start"
          >
            {(selectedOption === 'other' || !hasChildren) && (
              <>
                <FormLabel margin="0" textStyle="subhead-2">
                  NRIC / FIN number
                </FormLabel>
                <Controller
                  name="nric"
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <>
                      <Input
                        id="nricInput"
                        isRequired
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
              </>
            )}
          </Stack>
        </Stack>
      </FormControl>
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
