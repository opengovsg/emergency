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
  Skeleton,
} from '@chakra-ui/react'

import { BiDotsHorizontalRounded, BiPencil, BiTrash } from 'react-icons/bi'

export const SkeletonNoteView = (): JSX.Element => {
  return (
    <Card
      display="flex"
      p="1rem"
      flexDirection="column"
      alignItems="flex-start"
      gap="0.5rem"
      alignSelf="stretch"
    >
      <Box display="flex" width="17.5rem" alignItems="flex-start">
        <Stack width="16rem" alignItems="flex-start" gap="0.5rem">
          <Stack alignItems="flex-start" gap="0.25rem" alignSelf="stretch">
            <Skeleton>
              <Text textColor="base.content.brand" textStyle="legal">
                Message Recipient
              </Text>
            </Skeleton>
            <Skeleton>
              <Text textStyle="subhead-1">loading...</Text>
            </Skeleton>
          </Stack>
          <Skeleton>
            <Text textStyle="noteView">loading...</Text>
          </Skeleton>
        </Stack>
        <Skeleton>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<BiDotsHorizontalRounded color="black" size={24} />}
              colorScheme="white"
              aria-label="Options"
              size="24px"
            />
            <MenuList>
              <MenuItem icon={<BiPencil />}>Edit</MenuItem>
              <MenuItem icon={<BiTrash />} color="utility.feedback.critical">
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Skeleton>
      </Box>
    </Card>
  )
}
