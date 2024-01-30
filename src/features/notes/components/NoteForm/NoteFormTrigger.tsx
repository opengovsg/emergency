import {
  FormControl,
  FormErrorMessage,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { type ClientAddNoteSchema } from '../../schemas/addNoteSchema'
import { Trigger } from '@prisma/client'
interface NoteFormTriggerProps extends UseFormReturn<ClientAddNoteSchema> {
  handleNext: () => void
  handleCancel: () => void
}

export const NoteFormTrigger = ({
  handleNext,
  handleCancel,
  ...props
}: NoteFormTriggerProps) => {
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
        <Text textStyle="h6">When do you want to send your note?</Text>
        <Text textStyle="body-2">
          Please select the moment your note will reach your emergency contact.
        </Text>
        <FormControl isRequired isInvalid={!!errors.trigger}>
          <Controller
            name="trigger"
            control={control}
            defaultValue={Trigger.DEATH}
            render={({ field: { onChange, onBlur, value } }) => (
              <RadioGroup
                onChange={(newValue) => {
                  onChange(newValue)
                  onBlur()
                }}
                value={value}
              >
                <Stack>
                  <Radio size="xs" value={Trigger.DEATH}>
                    <Text textStyle="body-2">
                      Upon my passing, or losing of mental capacity
                    </Text>
                  </Radio>
                  <Radio size="xs" value={Trigger.IMMEDIATE}>
                    <Text textStyle="body-2">Send immediately</Text>
                  </Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>{errors.trigger?.message}</FormErrorMessage>
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
