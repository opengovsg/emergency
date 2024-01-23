import { Post } from '~/features/posts/components'
import { trpc } from '~/utils/trpc'
import { EmptyPostList } from './EmptyPostList'
import { Stack, StackDivider, Flex } from '@chakra-ui/react'
import { NoteTabs } from './NoteTabs'
import { useState } from 'react'
import { APP_GRID_COLUMN } from '~/constants/layouts'
import { AddNewNote } from '~/features/notes/components/AddNewNote'
import { MyNoteList } from '~/features/notes/components/MyNoteList/MyNoteList'
export const NoteHome = (): JSX.Element => {
  // if (data.items.length === 0) {
  //   return <EmptyPostList />
  // }
  const [tabNumber, setTabNumber] = useState(1)
  return (
    <Flex
      padding="2rem 0rem"
      flexDirection="column"
      alignItems="center"
      gap="1.5rem"
      justifyContent="center"
    >
      <NoteTabs tabNumber={tabNumber} setTabNumber={setTabNumber} />
      <AddNewNote />
      <MyNoteList />
    </Flex>
  )
}
