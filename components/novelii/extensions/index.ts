import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

import { Markdown } from 'tiptap-markdown'

export const extensions = [
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Underline,
  Link,
  Superscript,
  Subscript,
  Markdown,
  Placeholder.configure({
    placeholder: 'Start writing ...',
  }),
]
