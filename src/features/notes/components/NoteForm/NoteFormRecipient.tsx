import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  Infobox,
  Link,
  PhoneNumberInput,
  SingleSelect,
} from '@opengovsg/design-system-react'
import { useState } from 'react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { useMe } from '~/features/me/api'
import { calculateAge } from '~/utils/dates'
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
    trigger,
  } = props
  const watchedNric = watch('nric') // Watch the `nric` field
  const { me } = useMe()
  const hasChildren = me.children && me.children.length > 0
  const isSelected = me.children.some((child) => child.nric === watchedNric)
  const [selectedOption, setSelectedOption] = useState(
    isSelected ? watchedNric : !!watchedNric ? 'other' : '',
  )
  const [hasSingpass, setHasSingpass] = useState(() => {
    const user = me.children.find((child) => child.nric === selectedOption)
    if (user && user.dob) {
      const age = calculateAge(new Date(user.dob))
      if (age.year < 15) {
        return false
      } else {
        return true
      }
    }
    return true
  })
  const handleSelectChange = (value: string) => {
    setSelectedOption(value)
    if (value !== 'other') {
      // Update the form value for `nric`
      const user = me.children.find((child) => child.nric === value)
      if (user && user.dob) {
        const age = calculateAge(new Date(user.dob))
        if (age.year < 15) {
          setHasSingpass(false)
        } else {
          setHasSingpass(true)
        }
      }
      setValue('nric', value, { shouldValidate: true })
    } else {
      setHasSingpass(true)
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
        <Text textStyle="h6">Who are you sending this note to?</Text>
        <Text textStyle="body-2">
          Please enter the intended recipient{"'"}s details carefully below to
          ensure your note reaches the right person.
        </Text>
      </Stack>
      <Stack w="full" gap="1rem">
        <FormControl isRequired isInvalid={!!errors.nric}>
          <Stack gap="1rem">
            {hasChildren && (
              <Stack width="full" alignItems="flex-start" gap="0.5rem">
                <FormLabel mb="0rem">Note recipient</FormLabel>
                <Box width="full">
                  <SingleSelect
                    isClearable={false}
                    items={[
                      ...me.children.map((child) => {
                        return {
                          label: `${child.nric} - ${child.name}`,
                          value: child.nric,
                        }
                      }),
                      { label: 'Send to another recipient', value: 'other' },
                    ]}
                    onChange={handleSelectChange}
                    value={selectedOption}
                    name="Select your note recipient"
                    placeholder="Select your note recipient"
                  />
                </Box>
                {!hasSingpass && (
                  <Infobox variant="warning">
                    <Text>
                      Notes addressed to recipients without a Singpass account
                      will be securely held and delivered upon their Singpass
                      registration. Find out more{' '}
                      <Link isExternal={true} href="/">
                        here
                      </Link>
                      .
                    </Text>
                  </Infobox>
                )}
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
                    render={({ field: { onChange, value, ref } }) => (
                      <>
                        <Input
                          id="nricInput"
                          isRequired
                          placeholder="Enter the recipient's NRIC"
                          onChange={onChange}
                          onBlur={() => trigger('nric')}
                          value={value}
                          ref={ref}
                        />
                        <FormErrorMessage m="0rem">
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
        <FormControl isRequired isInvalid={!!errors.mobile}>
          <FormLabel mb="0rem">Mobile number</FormLabel>
          <FormHelperText mb="0.5rem">
            <Text textStyle="body-2">
              Your recipient will receive a SMS when this note is delivered
            </Text>
          </FormHelperText>
          <Controller
            name="mobile"
            render={({ field: { onChange, value, ref } }) => (
              <PhoneNumberInput
                onBlur={() => trigger('mobile')}
                mb="0.5rem"
                allowInternational={false}
                defaultCountry="SG"
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
            control={control}
          />
          <FormErrorMessage m="0rem">
            {errors.mobile && errors.mobile.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>

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
