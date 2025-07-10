import { Editor as TiptapEditor } from '@tiptap/react'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import {
  Bold,
  CheckIcon,
  ChevronDownIcon,
  Code,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Type,
  Underline,
  XIcon,
} from 'lucide-react'

const formattingItems = [
  {
    name: 'Bold',
    icon: Bold,
    command: (editor: TiptapEditor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor: TiptapEditor) => editor.isActive('bold'),
  },
  {
    name: 'Italic',
    icon: Italic,
    command: (editor: TiptapEditor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor: TiptapEditor) => editor.isActive('italic'),
  },
  {
    name: 'Underline',
    icon: Underline,
    command: (editor: TiptapEditor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor: TiptapEditor) => editor.isActive('underline'),
  },
  {
    name: 'Strikethrough',
    icon: Strikethrough,
    command: (editor: TiptapEditor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor: TiptapEditor) => editor.isActive('strike'),
  },
  {
    name: 'Superscript',
    icon: Superscript,
    command: (editor: TiptapEditor) => editor.chain().focus().toggleSuperscript().run(),
    isActive: (editor: TiptapEditor) => editor.isActive('superscript'),
  },
  {
    name: 'Subscript',
    icon: Subscript,
    command: (editor: TiptapEditor) => editor.chain().focus().toggleSubscript().run(),
    isActive: (editor: TiptapEditor) => editor.isActive('subscript'),
  },
  {
    name: 'Code',
    icon: Code,
    command: (editor: TiptapEditor) => editor.chain().focus().toggleCode().run(),
    isActive: (editor: TiptapEditor) => editor.isActive('code'),
  },
]

export function FormattingSelector({ editor }: { editor: TiptapEditor }) {
  const [open, setOpen] = useState(false)

  // Find active formatting to display in the button
  const activeFormats = formattingItems.filter(item => item.isActive(editor))
  // Use Type icon as default, or the first active format icon if any are active
  const ActiveIcon = activeFormats.length > 0 ? activeFormats[0].icon : Type

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2 rounded-none border-none">
            <ActiveIcon className="size-4" />
            <span className="text-sm whitespace-nowrap">Format</span>
            <ChevronDownIcon className="size-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-1" align="start">
          {formattingItems.map(item => (
            <div
              key={item.name}
              className="hover:bg-accent flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm"
              onClick={() => {
                item.command(editor)
                // Keep the dropdown open for formatting options to allow multiple selections
              }}
            >
              <item.icon className="me-2 size-4" />
              <span>{item.name}</span>
              <div className="flex-1" />
              {item.isActive(editor) && <CheckIcon className="ms-2 size-4" />}
            </div>
          ))}

          {/* Divider */}
          <div className="bg-muted my-1 h-px" />

          {/* Clear All Formatting Button */}
          <div
            className="hover:bg-accent flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm"
            onClick={() => {
              editor.chain().focus().clearNodes().unsetAllMarks().run()
              setOpen(false)
            }}
          >
            <XIcon className="me-2 size-4" />
            <span>Clear Formatting</span>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
