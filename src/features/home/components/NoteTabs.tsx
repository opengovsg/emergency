import { Flex, Text } from '@chakra-ui/react'

interface NoteTabsProps {
  tabNumber: number
  setTabNumber: (value: number) => void
}

export const NoteTabs = ({ tabNumber, setTabNumber }: NoteTabsProps) => {
  return (
    <Flex alignItems="flex-start" width="full">
      <Flex
        width="full"
        py="0.5rem"
        px="1rem"
        justifyContent="center"
        alignItems="center"
        gap="0.5rem"
        onClick={() => setTabNumber(1)}
        borderRadius="4px 0px 0px 4px"
        borderTop="1px solid"
        borderLeft="1px solid"
        borderBottom="1px solid"
        borderRight={tabNumber == 1 ? '1px solid' : ''}
        borderColor={
          tabNumber == 1 ? 'interaction.main.default' : 'base.divider.strong'
        }
        backgroundColor={
          tabNumber == 1 ? 'interaction.muted.main.active' : 'utility.ui-clear'
        }
        cursor="pointer"
      >
        <Text
          textColor={
            tabNumber == 1 ? 'interaction.main.default' : 'base.content.default'
          }
          textStyle="subhead-2"
        >
          My Notes
        </Text>
      </Flex>
      <Flex
        width="full"
        py="0.5rem"
        px="1rem"
        justifyContent="center"
        alignItems="center"
        gap="0.5rem"
        onClick={() => setTabNumber(2)}
        borderRadius="0px 4px 4px 0px"
        borderTop="1px solid"
        borderRight="1px solid"
        borderBottom="1px solid"
        borderLeft={tabNumber == 2 ? '1px solid' : ''}
        borderColor={
          tabNumber == 2 ? 'interaction.main.default' : 'base.divider.strong'
        }
        backgroundColor={
          tabNumber == 2 ? 'interaction.muted.main.active' : 'utility.ui-clear'
        }
        cursor="pointer"
      >
        <Text
          textColor={
            tabNumber == 2 ? 'interaction.main.default' : 'base.content.default'
          }
          textStyle="subhead-2"
        >
          Notes Received
        </Text>
      </Flex>
    </Flex>
  )
}
