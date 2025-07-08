'use client'

import Link from '@tiptap/extension-link'
// Tiptap extensions
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
// Tiptap core
import { EditorContent, useEditor } from '@tiptap/react'
import type { Editor as TiptapEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { useRef, useState } from 'react'

import { Markdown } from 'tiptap-markdown'

import { initialContent } from '../lib/config/initial-content'
// Bubble Menu
import { BubbleMenu } from './bubble-menu/bubble-menu'
import { CopilotTrigger } from './copilot/copilot-trigger'
import { fetchSuggestion } from './copilot/fetch-suggestion'
import { getGhostText } from './copilot/get-ghost-text'
import { makeGhostKeydownHandler } from './copilot/ghost-keydown-handler'
import { AIGhostText } from './copilot/ghost-text'
// Settings Sheet Menu
import { SettingsSheet } from './settings-sheet'
import { ThemeToggle } from './ui/theme-toggle'

export const Editor = () => {
  const [aiEnabled, setAiEnabled] = useState(true)
  const [aiBubbleEnabled, setAiBubbleEnabled] = useState(true)
  const [htmlEnabled, setHtmlEnabled] = useState(false)
  const [spellCheckEnabled, setSpellCheckEnabled] = useState(false)

  const editorRef = useRef<TiptapEditor | null>(null)

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
      CopilotTrigger.configure({
        onTrigger: () => editorRef.current && fetchSuggestion(editorRef.current),
      }),
      AIGhostText,
    ],
    content: initialContent,
    immediatelyRender: false,
    onCreate({ editor }) {
      editorRef.current = editor
    },
    editorProps: {
      attributes: {
        spellcheck: spellCheckEnabled ? 'true' : 'false',
      },
      handleDOMEvents: {
        keydown: makeGhostKeydownHandler(editorRef, () => getGhostText(editorRef.current)),
      },
    },
  })

  return (
    <>
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      <EditorContent editor={editor} />
      <SettingsSheet
        aiEnabled={aiEnabled}
        setAiEnabled={setAiEnabled}
        aiBubbleEnabled={aiBubbleEnabled}
        setAiBubbleEnabled={setAiBubbleEnabled}
        htmlEnabled={htmlEnabled}
        setHtmlEnabled={setHtmlEnabled}
        spellCheckEnabled={spellCheckEnabled}
        setSpellCheckEnabled={setSpellCheckEnabled}
      />
      <BubbleMenu editor={editor} aiEnabled={aiEnabled} aiBubbleEnabled={aiBubbleEnabled} />
      {htmlEnabled && (
        <div className="text-muted-foreground mt-8 border-t text-xs">
          HTML of the document:
          <pre className="p-4">{editor?.getHTML()}</pre>
        </div>
      )}
    </>
  )
}
