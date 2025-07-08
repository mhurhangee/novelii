import type { Editor as TiptapEditor } from '@tiptap/react'

export function getGhostText(editor: TiptapEditor | null): string {
  return (
    editor?.extensionManager.extensions.find(ext => ext.name === 'aiGhostText')?.options
      .ghostText ?? ''
  )
}
