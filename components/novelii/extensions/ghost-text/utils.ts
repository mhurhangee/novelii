import type { Editor as TiptapEditor } from '@tiptap/react'

import type { RefObject } from 'react'

import { markdownToTiptapContent } from '../../../../lib/markdown'

export function makeGhostKeydownHandler(
  editorRef: RefObject<TiptapEditor | null>,
  getGhostText: () => string
) {
  return (view: unknown, event: KeyboardEvent) => {
    const ghost = getGhostText()
    if ((event.key === 'Tab' || event.key === 'Enter') && ghost) {
      const ghostJson = markdownToTiptapContent(ghost)
      editorRef.current?.commands.insertContent(ghostJson)
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
