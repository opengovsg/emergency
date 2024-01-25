import { Flex } from '@chakra-ui/react'
import { NoteTabs } from './NoteTabs'
import { useState } from 'react'
import { AddNewNote } from '~/features/notes/components/AddNewNote'
import { MyNoteList } from '~/features/notes/components/MyNoteList/MyNoteList'
import { NoteReceived } from '~/features/notes/components/NoteReceived'
export const NoteHome = (): JSX.Element => {
  const [tabNumber, setTabNumber] = useState(1)
  return (
    <Flex
      padding="2rem 0rem"
      flexDirection="column"
      alignItems="center"
      gap="1.5rem"
      justifyContent="center"
      width="full"
    >
      <NoteTabs tabNumber={tabNumber} setTabNumber={setTabNumber} />
      {tabNumber === 1 ? (
        <>
          <AddNewNote />
          <MyNoteList />
        </>
      ) : (
        <NoteReceived />
      )}
    </Flex>
  )
}
