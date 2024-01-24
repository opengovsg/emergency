import {
  Stack,
  Text,
  Card,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Flex,
  Icon,
} from '@chakra-ui/react'

import { type RouterOutput } from '~/utils/trpc'
import {
  BiDotsHorizontalRounded,
  BiPencil,
  BiTrash,
  BiTimeFive,
  BiSend,
} from 'react-icons/bi'
import { DeleteNoteModal } from '../DeleteNoteModal'
import { useRouter } from 'next/router'
import { Trigger } from '@prisma/client'
export interface NoteViewProps {
  note:
    | RouterOutput['note']['listCreated']['items'][number]
    | RouterOutput['note']['listReceived']['items'][number]
  isViewOnly?: boolean
}

export const NoteView = ({
  note,
  isViewOnly = false,
}: NoteViewProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }
  const handleEditClick = async (event: React.MouseEvent) => {
    event.stopPropagation()
    await router.push(`/edit-note/${note.id}`)
  }

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    onOpen()
  }
  return (
    <Card
      display="flex"
      px="1rem"
      py="1.5rem"
      flexDirection="column"
      alignItems="flex-start"
      gap="0.75rem"
      alignSelf="stretch"
      onClick={() => router.push(`/note/${note.id}`)}
    >
      <Box display="flex" width="17.5rem" alignItems="flex-start">
        <Stack width="16rem" alignItems="flex-start" gap="0.5rem">
          <Stack alignItems="flex-start" gap="0.25rem" alignSelf="stretch">
            <Text textColor="base.content.brand" textStyle="legal">
              Message Recipient
            </Text>
            <Text textStyle="subhead-1">{note.recipient.nric}</Text>
          </Stack>
          <Text textStyle="noteView">{note.content}</Text>
        </Stack>
        {!isViewOnly ? (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<BiDotsHorizontalRounded color="black" size={24} />}
              colorScheme="white"
              aria-label="Options"
              size="24px"
              onClick={handleMenuClick}
            />
            <MenuList>
              <MenuItem icon={<BiPencil />} onClick={handleEditClick}>
                Edit
              </MenuItem>
              <MenuItem
                icon={<BiTrash />}
                color="utility.feedback.critical"
                onClick={handleDeleteClick}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        ) : null}
      </Box>
      <Flex
        py="0.25rem"
        px="0.5rem"
        alignItems="center"
        gap="0.25rem"
        borderRadius="0.25rem"
        bgColor={
          note.trigger === Trigger.DEATH
            ? 'interaction.main-subtle.default'
            : 'interaction.sub-subtle.default'
        }
      >
        <Icon
          as={note.trigger === Trigger.DEATH ? BiTimeFive : BiSend}
          width="0.75rem"
          height="0.75rem"
        />
        <Text
          textStyle="legal"
          textColor={
            note.trigger === Trigger.DEATH
              ? 'interaction.main.default'
              : 'interaction.sub.default'
          }
        >
          {note.trigger === Trigger.DEATH ? 'Upon passing' : 'Immediate'}
        </Text>
      </Flex>
      <DeleteNoteModal isOpen={isOpen} onClose={onClose} id={note.id} />
    </Card>
  )
}
