'use client'

import { useEditor } from "@tiptap/react"
import { initialContent } from "@/lib/config/initial-content"
import { SplitView } from "./split-view"
import { extensions } from "./extensions"
import { InlineAISuggestion } from "./extensions/inline-ai-suggestion"
import { fetchSuggestion } from "./extensions/inline-ai-suggestion/utils"
import { AIGhostText } from "./extensions/ghost-text"
import { makeGhostKeydownHandler } from "./extensions/ghost-text/utils"
import { getGhostText } from "./extensions/ghost-text/utils"
import { useRef } from "react"
import { Editor as TiptapEditor } from "@tiptap/react"
import { AiInsert, AiDelete, AiComment } from "./extensions/ai-marks"

export const Editor = () => {
  const editorRef = useRef<TiptapEditor | null>(null)

  const editor = useEditor({
    extensions: [
      ...extensions,
      InlineAISuggestion.configure({
        onTrigger: () => editorRef.current && fetchSuggestion(editorRef.current),
      }),
      AIGhostText,
      AiInsert,
      AiDelete,
      AiComment,
    ],
    onCreate({ editor }) {
      editorRef.current = editor
    },
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
      handleDOMEvents: {
        keydown: makeGhostKeydownHandler(editorRef, () => getGhostText(editorRef.current)),
      },
    },
  })
  if (!editor) return null
  return (
    <SplitView editor={editor} />
  )
}



