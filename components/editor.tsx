'use client'

import Link from '@tiptap/extension-link'
// Tiptap extensions
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
// Tiptap core
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { useState } from 'react'

import { Markdown } from 'tiptap-markdown'

import { initialContent } from '../lib/config/initial-content'
// Bubble Menu
import { BubbleMenu } from './bubble-menu/bubble-menu'
// Settings Sheet Menu
import { SettingsSheet } from './settings-sheet'

export const Editor = () => {
  const [aiEnabled, setAiEnabled] = useState(true)
  const [htmlEnabled, setHtmlEnabled] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder,
      Markdown,
      Underline,
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: initialContent,
    immediatelyRender: false,
  })

  return (
    <>
      <EditorContent editor={editor} />
      <SettingsSheet
        aiEnabled={aiEnabled}
        setAiEnabled={setAiEnabled}
        htmlEnabled={htmlEnabled}
        setHtmlEnabled={setHtmlEnabled}
      />
      <BubbleMenu editor={editor} aiEnabled={aiEnabled} />
      {htmlEnabled && (
        <div className="text-muted-foreground mt-8 border-t text-xs">
          HTML of the document:
          <pre className="p-4">{editor?.getHTML()}</pre>
        </div>
      )}
    </>
  )
}
