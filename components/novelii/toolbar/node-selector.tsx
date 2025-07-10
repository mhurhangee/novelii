import { Editor } from '@tiptap/react'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import {
  CheckIcon,
  ChevronDownIcon,
  Heading1,
  Heading2,
  Heading3,
  LetterTextIcon,
  List,
  ListOrdered,
  QuoteIcon,
} from 'lucide-react'

const items = [
  {
    name: 'Text',
    icon: LetterTextIcon,
    command: (editor: Editor) => editor.chain().focus().setParagraph().run(),
    isActive: (editor: Editor) => editor.isActive('paragraph'),
  },
  {
    name: 'Heading 1',
    icon: Heading1,
    command: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor: Editor) => editor.isActive('heading', { level: 1 }),
  },
  {
    name: 'Heading 2',
    icon: Heading2,
    command: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor: Editor) => editor.isActive('heading', { level: 2 }),
  },
  {
    name: 'Heading 3',
    icon: Heading3,
    command: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor: Editor) => editor.isActive('heading', { level: 3 }),
  },
  {
    name: 'Bullet List',
    icon: List,
    command: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor) => editor.isActive('bulletList'),
  },
  {
    name: 'Numbered List',
    icon: ListOrdered,
    command: (editor: Editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor: Editor) => editor.isActive('orderedList'),
  },
  {
    name: 'Quote',
    icon: QuoteIcon,
    command: (editor: Editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor: Editor) => editor.isActive('blockquote'),
  },
]

export function NodeSelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false)
  const active = items.find(i => i.isActive(editor)) ?? items[0]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 rounded-none border-none">
          <active.icon className="size-4" />
          <span className="text-sm whitespace-nowrap">{active.name}</span>
          <ChevronDownIcon className="size-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1" align="start">
        {items.map(item => (
          <div
            key={item.name}
            className="hover:bg-accent flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm"
            onClick={() => {
              item.command(editor)
              setOpen(false)
            }}
          >
            <item.icon className="me-2 size-4" />
            <span>{item.name}</span>
            <div className="flex-1" />
            {item.isActive(editor) && <CheckIcon className="ms-2 size-4" />}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
