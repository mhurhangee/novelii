import type { Editor as TiptapEditor } from '@tiptap/react'

import type { RefObject } from 'react'

export function makeGhostKeydownHandler(
  editorRef: RefObject<TiptapEditor | null>,
  getGhostText: () => string
) {
  return (view: unknown, event: KeyboardEvent) => {
    const ghost = getGhostText()
    if ((event.key === 'Tab' || event.key === 'Enter') && ghost) {

      editorRef.current?.commands.insertContent({
        type: 'text',
        text: ghost,
        marks: [
          { type: 'ai_insert', attrs: { reason: 'AI insert' } }
        ],
      })
      editorRef.current?.commands.unsetMark('ai_insert')
      editorRef.current?.commands.clearGhostText()
      event.preventDefault()
      return true
    }
    if (event.key !== 'Tab' && event.key !== 'Enter' && ghost) {
      editorRef.current?.commands.clearGhostText()
      event.preventDefault()
      return true
    }
    return false
  }
}

export function getGhostText(editor: TiptapEditor | null): string {
  return (
    editor?.extensionManager.extensions.find(ext => ext.name === 'aiGhostText')?.options
      .ghostText ?? ''
  )
}

