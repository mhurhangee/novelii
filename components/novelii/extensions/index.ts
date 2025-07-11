import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import typescript from 'highlight.js/lib/languages/typescript'
import { createLowlight } from 'lowlight'
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'
import { Markdown } from 'tiptap-markdown'

const lowlight = createLowlight()
lowlight.register('javascript', javascript)
lowlight.register('python', python)
lowlight.register('typescript', typescript)

export const extensions = [
  GlobalDragHandle,
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
  CodeBlockLowlight.configure({
    lowlight,
  }),
]
