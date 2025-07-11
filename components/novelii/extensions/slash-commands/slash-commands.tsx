import type { Editor as TiptapEditor } from '@tiptap/react'

import {
  CodeIcon,
  Command as CommandIcon,
  DivideIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  SparklesIcon,
} from 'lucide-react'

type Command = {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  command: (editor: TiptapEditor, range: { from: number; to: number }) => void
}

export const COMMANDS: Command[] = [
  {
    title: 'AI Command',
    description: 'Open AI Command menu',
    icon: SparklesIcon,
    command: (editor, range) => {
      // Move selection to where the slash command was
      editor.chain().focus().deleteRange(range).run()
      editor.chain().focus().insertContent(' <br/> ').run()
      editor
        .chain()
        .focus()
        .setTextSelection({ from: range.from, to: range.from + 1 })
        .run()
      // Or, if needed, add a custom mark or attribute so shouldShow returns true
    },
  },
  {
    title: 'Paragraph',
    description: 'Normal text.',
    icon: CommandIcon,
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).setNode('paragraph').run(),
  },
  {
    title: 'Heading 1',
    description: 'Largest section heading.',
    icon: Heading1Icon,
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run(),
  },
  {
    title: 'Heading 2',
    description: 'Medium section heading.',
    icon: Heading2Icon,
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run(),
  },
  {
    title: 'Heading 3',
    description: 'Smaller section heading.',
    icon: Heading3Icon,
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run(),
  },
  {
    title: 'Bullet List',
    description: 'Simple bullet list.',
    icon: ListIcon,
    command: (editor, range) => editor.chain().focus().deleteRange(range).toggleBulletList().run(),
  },
  {
    title: 'Numbered List',
    description: 'Simple numbered list.',
    icon: ListOrderedIcon,
    command: (editor, range) => editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
  },
  {
    title: 'Quote',
    description: 'Quote text.',
    icon: QuoteIcon,
    command: (editor, range) => editor.chain().focus().deleteRange(range).toggleBlockquote().run(),
  },
  {
    title: 'Divider',
    description: 'Horizontal line.',
    icon: DivideIcon,
    command: (editor, range) => editor.chain().focus().deleteRange(range).setHorizontalRule().run(),
  },
  {
    title: 'Code Block',
    description: 'Code block.',
    icon: CodeIcon,
    command: (editor, range) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
]
