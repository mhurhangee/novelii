'use client'

import Link from '@tiptap/extension-link'
// Tiptap extensions
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'

import { CopilotTrigger } from './copilot/extension'
import { AIGhostText } from './ghost-text/extension'
// Tiptap core
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { useState, useRef } from 'react'

import { Markdown } from 'tiptap-markdown'

import { initialContent } from '../lib/config/initial-content'
// Bubble Menu
import { BubbleMenu } from './bubble-menu/bubble-menu'
// Settings Sheet Menu
import { SettingsSheet } from './settings-sheet'

import { ThemeToggle } from './ui/theme-toggle'

import type { Editor as TiptapEditor } from '@tiptap/react'

export const Editor = () => {
  const [aiEnabled, setAiEnabled] = useState(true)
  const [aiBubbleEnabled, setAiBubbleEnabled] = useState(true)
  const [htmlEnabled, setHtmlEnabled] = useState(false)
  const [spellCheckEnabled, setSpellCheckEnabled] = useState(false)

  const editorRef = useRef<TiptapEditor | null>(null);

  const getGhostText = () =>
    editorRef.current?.extensionManager.extensions
      .find(ext => ext.name === "aiGhostText")?.options.ghostText ?? ""

  async function fetchSuggestion() {
    const fullText = editorRef.current?.getText() ?? "";
    const selectionEnd = editorRef.current?.state.selection.to;
    const res = await fetch("/api/copilot", {
      method: "POST",
      body: JSON.stringify({ fullText, selectionEnd }),
      headers: { "Content-Type": "application/json" },
    });
    const suggestion = await res.json();
    
    editorRef.current?.commands.setGhostText(suggestion.aiContent, selectionEnd ?? 0);
  }

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
        onTrigger: fetchSuggestion,
      }),
      AIGhostText,
    ],
    content: initialContent,
    immediatelyRender: false,
    onCreate({ editor }) {
      editorRef.current = editor;
    },
    editorProps: {
      attributes: {
        spellcheck: spellCheckEnabled ? 'true' : 'false',
      },
      handleDOMEvents: {
        // Listen for Tab/Enter for accepting the suggestion
        keydown: (view, event) => {
          const ghost = getGhostText();
          if ((event.key === "Tab" || event.key === "Enter") && ghost) {
            editorRef.current?.commands.insertContent(ghost);
            editorRef.current?.commands.clearGhostText();
            event.preventDefault();
            return true;
          }
          if (event.key === "Escape" && ghost) {
            editorRef.current?.commands.clearGhostText();
            event.preventDefault();
            return true;
          }
          return false;
        }
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
