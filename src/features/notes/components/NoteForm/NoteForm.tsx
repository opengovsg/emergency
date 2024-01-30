import { Stack } from '@chakra-ui/react'
import { useToast } from '@opengovsg/design-system-react'
import { useRouter } from 'next/router'
import React from 'react'
import { type z } from 'zod'
import { useZodForm } from '~/lib/form'
import { addNoteSchema } from '~/schemas/note'
import { trpc } from '~/utils/trpc'
import { NoteFormNavbar } from './NoteFormNavbar'
import { NoteFormRecipient } from './NoteFormRecipient'
import { NoteFormSummary } from './NoteFormSummary'
import { NoteFormText } from './NoteFormText'
import { NoteFormTrigger } from './NoteFormTrigger'

interface NoteFormProps {
  note?: z.infer<typeof addNoteSchema>
}

export const MAX_STEPS = 4
export const NoteForm = ({ note }: NoteFormProps) => {
  const router = useRouter()
  const [step, setStep] = React.useState(1)
  const toast = useToast()
  const formMethods = useZodForm({
    schema: addNoteSchema,
    defaultValues: note,
  })
  const { trigger, handleSubmit, reset } = formMethods

  const handleGoBack = async () => {
    if (step == 1) {
      await router.push('/home')
    } else {
      setStep(step - 1)
    }
  }

  const handleCancel = async () => {
    await router.push('/home')
  }
  const utils = trpc.useContext()
  const { mutate, isLoading } = trpc.note.add.useMutation({
    async onSuccess() {
      toast({ description: 'You have saved a new note.' })
      reset()
      await utils.note.invalidate()
      await router.push('/home')
    },
  })

  const handleSubmitNote = handleSubmit(async (data) => {
    return mutate(data)
  })

  const validateStep = async (step: number) => {
    if (step === 1) {
      return await trigger(['nric', 'mobile'])
    } else if (step === 2) {
      return await trigger(['content', 'contentHtml'])
    } else if (step === 3) {
      return await trigger('trigger')
    }
  }

  const handleNext = async () => {
    const isValid = await validateStep(step)
    if (isValid) {
      setStep(step + 1)
    }
  }

  return (
    <Stack>
      <NoteFormNavbar step={step} handleGoBack={handleGoBack} />

      {step === 1 ? (
        <NoteFormRecipient
          handleNext={handleNext}
          {...formMethods}
          handleCancel={handleCancel}
        />
      ) : step === 2 ? (
        <NoteFormText
          {...formMethods}
          handleNext={handleNext}
          handleCancel={handleCancel}
        />
      ) : step === 3 ? (
        <NoteFormTrigger
          handleNext={handleNext}
          {...formMethods}
          handleCancel={handleCancel}
        />
      ) : step === 4 ? (
        <NoteFormSummary
          isLoading={isLoading}
          {...formMethods}
          handleSubmitNote={handleSubmitNote}
          handleCancel={handleCancel}
        />
      ) : null}
    </Stack>
  )
}
