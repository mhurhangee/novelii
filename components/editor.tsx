'use client'

import { useState } from 'react'

// Tiptap core
import { EditorContent, useEditor } from '@tiptap/react'

// Tiptap extensions
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'

// Sheet Menu
import Scribe from './scribe'

// Bubble Menu
import { BubbleMenu } from './bubble-menu/bubble-menu'

export const Editor = () => {
  const [scribeEnabled, setScribeEnabled] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder,
      Markdown,
      Underline,
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      })
    ],
    immediatelyRender: false,
  })

  return (
    <>
      <EditorContent editor={editor} />
      <Scribe scribeEnabled={scribeEnabled} setScribeEnabled={setScribeEnabled} />
      <BubbleMenu editor={editor} />
      <pre>{editor?.getHTML()}</pre>
    </>
  )
}
