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
import { Button, ModalCloseButton } from '@opengovsg/design-system-react'
import { useRouter } from 'next/router'
import { trpc, type RouterOutput } from '~/utils/trpc'

interface UnreadModalProps extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  note: RouterOutput['note']['listUnread']['items'][number]
}

export const UnreadModal = ({ onClose, isOpen, note }: UnreadModalProps) => {
  const router = useRouter()
  const utils = trpc.useContext()
  const readMutation = trpc.note.read.useMutation({
    async onSuccess() {
      await utils.note.invalidate()
    },
  })
  const handleViewClick = async (event: React.MouseEvent) => {
    event.stopPropagation()
    readMutation.mutate({ id: note.id })
    await router.push(`/note/${note.id}`)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Note received</ModalHeader>
        <ModalCloseButton />
        <ModalBody gap="0.25rem">
          <Text textStyle="body-2">
            You have received an emergency note from {note.author.nric}.
          </Text>
          <br />
          <Text textStyle="body-2">
            Please review it carefully as it may contain important information.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Stack w="100%" flexDirection="column" gap="1rem">
            <Button
              onClick={handleViewClick}
              isLoading={readMutation.isLoading}
            >
              View Note
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
