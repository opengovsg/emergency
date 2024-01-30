import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  type ModalProps,
} from '@chakra-ui/react'
import { Button, useToast } from '@opengovsg/design-system-react'
import { Trigger } from '@prisma/client'
import { ResponsiveButton } from '~/components/ResponsiveButton'
import { trpc } from '~/utils/trpc'

export interface DeleteNoteModalProps
  extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  id: string
  trigger: Trigger
}

export const DeleteNoteModal = ({
  onClose,
  isOpen,
  id,
  trigger,
}: DeleteNoteModalProps) => {
  const toast = useToast()
  const utils = trpc.useContext()
  const deleteNoteMutation = trpc.note.delete.useMutation({
    async onSuccess() {
      toast({ description: 'Your note has been deleted successfully' })
      onClose()
      await utils.note.invalidate()
    },
  })
  const handleDelete = () => {
    deleteNoteMutation.mutate({ id })
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete note?</ModalHeader>
        <ModalBody>
          {trigger === Trigger.DEATH ? (
            <Text textStyle="body-2">
              This note will be permanently deleted. Are you sure you want to
              continue?
            </Text>
          ) : (
            <>
              <Text textStyle="body-2">This note has already been sent.</Text>
              <br />
              <Text textStyle="body-2">
                Deleting it will permanently remove it from your notes and it
                will no longer be visible to the recipient.
              </Text>
              <br />
              <Text textStyle="body-2">Are you sure you want to continue?</Text>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Stack w="100%" flexDirection="column" gap="1rem">
            <ResponsiveButton
              onClick={handleDelete}
              isLoading={deleteNoteMutation.isLoading}
              colorScheme="critical"
            >
              Delete Note
            </ResponsiveButton>
            <Button
              colorScheme="neutral"
              variant="clear"
              onClick={onClose}
              isDisabled={deleteNoteMutation.isLoading}
            >
              Cancel
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
