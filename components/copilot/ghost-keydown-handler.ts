import type { Editor as TiptapEditor } from '@tiptap/react'

import type { RefObject } from 'react'

export function makeGhostKeydownHandler(
  editorRef: RefObject<TiptapEditor | null>,
  getGhostText: () => string
) {
  return (view: unknown, event: KeyboardEvent) => {
    const ghost = getGhostText()
    if ((event.key === 'Tab' || event.key === 'Enter') && ghost) {
      editorRef.current?.commands.insertContent(ghost)
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
