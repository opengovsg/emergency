import { Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { type ClientAddNoteSchema } from '../../schemas/addNoteSchema'
import { Trigger } from '@prisma/client'
interface CreateNewNoteTriggerProps extends UseFormReturn<ClientAddNoteSchema> {
  handleNext: () => void
}

export const CreateNewNoteTrigger = ({
  handleNext,
  ...props
}: CreateNewNoteTriggerProps) => {
  const { control } = props
  return (
    <Stack
      px="1.5rem"
      pb="2rem"
      alignItems="flex-start"
      gap="2rem"
      alignSelf="stretch"
    >
      <Stack width="19.5rem" alignItems="flex-start" gap="1rem">
        <Text textStyle="h6">When do you want to send your note?</Text>
        <Text textStyle="body-2">
          Please select the moment your message will reach your emergency
          contact.
        </Text>
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
