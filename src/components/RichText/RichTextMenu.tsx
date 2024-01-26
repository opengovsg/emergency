// Hehe ripped from OpenSpace

import { Divider, Icon, IconButton, Tooltip, Wrap } from '@chakra-ui/react'
import { type Editor } from '@tiptap/react'
import { type IconType } from 'react-icons'
import {
  BiBold,
  BiItalic,
  BiListOl,
  BiListUl,
  BiStrikethrough,
} from 'react-icons/bi'

type MenuButton =
  | {
      type: 'button'
      label: string
      icon: IconType
      onClick: (editor: Editor) => void
      isActive?: (editor: Editor) => boolean
    }
  | {
      type: 'divider'
    }

const MENU_BUTTONS: MenuButton[] = [
  {
    type: 'button',
    label: 'Bold',
    onClick: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    icon: BiBold,
    isActive: (editor: Editor) => editor.isActive('bold'),
  },
  {
    type: 'button',
    label: 'Italic',
    onClick: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    icon: BiItalic,
    isActive: (editor: Editor) => editor.isActive('italic'),
  },
  {
    type: 'button',
    label: 'Strike',
    icon: BiStrikethrough,
    onClick: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor: Editor) => editor.isActive('strike'),
  },

  { type: 'divider' },

  {
    type: 'button',
    label: 'Bullet List',
    icon: BiListUl,
    onClick: (editor: Editor) =>
      editor.chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor) => editor.isActive('bulletList'),
  },
  {
    type: 'button',
    label: 'Ordered List',
    icon: BiListOl,
    onClick: (editor: Editor) =>
      editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor: Editor) => editor.isActive('orderedList'),
  },
]

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <Wrap
      p="0.25rem"
      shouldWrapChildren
      bg="grey.50"
      borderColor="base.divider.strong"
      borderWidth="1px 1px 0 1px"
      borderTopRadius="sm"
    >
      {MENU_BUTTONS.map((button, index) => {
        if (button.type === 'divider') {
          return (
            <Divider
              orientation="vertical"
              borderColor="base.divider.strong"
              h="2.75rem"
              key={`rtm-divider-${index}`}
            />
          )
        }
        const { onClick, label, icon, isActive } = button
        return (
          <Tooltip label={label} key={label}>
            <IconButton
              variant="clear"
              colorScheme="neutral"
              aria-label={label}
              onClick={() => onClick(editor)}
              isActive={isActive?.(editor)}
              icon={<Icon as={icon} />}
            />
          </Tooltip>
        )
      })}
    </Wrap>
  )
}
