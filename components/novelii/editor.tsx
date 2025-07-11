'use client'

import TableOfContents from '@tiptap/extension-table-of-contents'
import { getHierarchicalIndexes } from '@tiptap/extension-table-of-contents'
import { useEditor } from '@tiptap/react'
import { Editor as TiptapEditor } from '@tiptap/react'

import { useRef } from 'react'

import { initialContent } from '@/lib/config/initial-content'

import { extensions } from './extensions'
import { AiComment, AiDelete, AiInsert } from './extensions/ai-marks'
import { AIGhostText } from './extensions/ghost-text'
import { makeGhostKeydownHandler } from './extensions/ghost-text/utils'
import { getGhostText } from './extensions/ghost-text/utils'
import { InlineAISuggestion } from './extensions/inline-ai-suggestion'
import { fetchSuggestion } from './extensions/inline-ai-suggestion/utils'
import { SplitView } from './split-view'

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
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
      }),
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
  return <SplitView editor={editor} />
}
