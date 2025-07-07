'use client'

import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { useState } from 'react'

import { Markdown } from 'tiptap-markdown'

// Sheet Menu
import Scribe from './scribe'

export const Editor = () => {
  const [scribeEnabled, setScribeEnabled] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit, Placeholder, Markdown],
    immediatelyRender: false,
  })

  return (
    <>
      <EditorContent editor={editor} />
      <Scribe scribeEnabled={scribeEnabled} setScribeEnabled={setScribeEnabled} />
    </>
  )
}
