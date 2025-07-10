'use client'

// React
import Link from '@tiptap/extension-link'
// Tiptap extensions
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
// Tiptap core
import { type Editor as TiptapEditor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { useRef } from 'react'

// UI components
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ThemeToggle } from '@/components/ui/theme-toggle'

import { Assistant } from '@/components/assistant/assistant'
// Custom extensions and components
import { AiInsert, AiDelete, AiComment } from '@/components/v2/extensions/ai-marks'

import { CopilotTrigger } from '@/components/v2/extensions/copilot/copilot-trigger'
import { fetchSuggestion } from '@/components/v2/extensions/ghost-text/fetch-suggestion'
import { getGhostText } from '@/components/v2/extensions/ghost-text/get-ghost-text'
import { makeGhostKeydownHandler } from '@/components/v2/extensions/ghost-text/ghost-keydown-handler'
import { AIGhostText } from '@/components/v2/extensions/ghost-text/ghost-text'
// Editor
import { Editor } from '@/components/editor'

// Config
import { initialContent } from '@/lib/config/initial-content'

import { Markdown } from 'tiptap-markdown'

export default function Page() {
  const editorRef = useRef<TiptapEditor | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder,
      Markdown,
      Underline,
      Link,
      AiInsert,
      AiDelete,
      AiComment,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CopilotTrigger.configure({
        onTrigger: () => editorRef.current && fetchSuggestion(editorRef.current),
      }),
      ,
    ],
    content: initialContent,
    immediatelyRender: false,
    onCreate({ editor }) {
      editorRef.current = editor
    },
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
      handleDOMEvents: {
        keydown: makeGhostKeydownHandler(editorRef, () => getGhostText(editorRef.current)),
      },
    },
  })

  return (
    <main className="mx-auto h-screen w-screen font-sans">
      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-120px)] border">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full flex-col">
            <div className="fixed top-4 left-4 z-1000">
              <ThemeToggle />
            </div>
            <div className="p-4">
              <h1 className="mb-4 text-center text-3xl font-bold">Novelii Editor</h1>
              <p className="text-muted-foreground text-center">Write your document here</p>
            </div>
            {editor ? <Editor editor={editor} /> : null}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          {editor ? <Assistant editor={editor} /> : null}
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  )
}
