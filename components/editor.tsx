'use client'

// Tiptap core
import { EditorContent } from '@tiptap/react'
import type { Editor as TiptapEditor } from '@tiptap/react'

import { useState } from 'react'

// Bubble Menu
import { BubbleMenu } from './bubble-menu/bubble-menu'
// Settings Sheet Menu
import { SettingsSheet } from './settings-sheet'

export const Editor = ({ editor }: { editor: TiptapEditor }) => {
  const [aiEnabled, setAiEnabled] = useState(true)
  const [aiBubbleEnabled, setAiBubbleEnabled] = useState(true)
  const [htmlEnabled, setHtmlEnabled] = useState(false)
  const [spellCheckEnabled, setSpellCheckEnabled] = useState(false)

  return (
    <>
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
