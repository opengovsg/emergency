import { useRouter } from 'next/router'
import React from 'react'
import { CreateNewNoteNavbar } from './CreateNewNoteNavbar'
import { Stack } from '@chakra-ui/react'
import { CreateNewNoteRecipient } from './CreateNewNoteRecipient'
import { useZodForm } from '~/lib/form'
import { addNoteSchema } from '~/schemas/note'
import { FormControl } from '@chakra-ui/react'
import { CreateNewNoteText } from './CreateNewNoteText'
import { CreateNewNoteTrigger } from './CreateNewNoteTrigger'
import { CreateNewNoteSummary } from './CreateNewNoteSummary'

export const MAX_STEPS = 4
export const CreateNewNote = () => {
  const router = useRouter()
  const [step, setStep] = React.useState(1)
  const formMethods = useZodForm({
    schema: addNoteSchema,
  })
  const {
    trigger,
    formState: { errors },
  } = formMethods
  const handleGoBack = async () => {
    if (step == 1) {
      await router.push('/home')
    } else {
      setStep(step - 1)
    }
  }

  const validateStep = async (step: number) => {
    if (step === 1) {
      await trigger('nric')
    } else if (step === 2) {
      await trigger('content')
      await trigger('contentHtml')
    } else if (step === 3) {
      await trigger('trigger')
    }
  }

  const handleNext = async () => {
    await validateStep(step)
    if (Object.keys(errors).length === 0) {
      setStep(step + 1)
    }
  }

  return (
    <Stack>
      <CreateNewNoteNavbar step={step} handleGoBack={handleGoBack} />
      <FormControl
        isRequired
        isInvalid={
          !!errors.content ||
          !!errors.contentHtml ||
          !!errors.nric ||
          !errors.trigger
        }
      >
        {step === 1 ? (
          <CreateNewNoteRecipient handleNext={handleNext} {...formMethods} />
        ) : step === 2 ? (
          <CreateNewNoteText {...formMethods} handleNext={handleNext} />
        ) : step === 3 ? (
          <CreateNewNoteTrigger handleNext={handleNext} {...formMethods} />
        ) : step === 4 ? (
          <CreateNewNoteSummary {...formMethods} />
        ) : null}
      </FormControl>
    </Stack>
  )
}
