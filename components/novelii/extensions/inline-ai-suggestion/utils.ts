import type { Editor as TiptapEditor } from '@tiptap/react'

import { AISettings } from '@/components/novelii/editor'

export async function fetchSuggestion(editor: TiptapEditor, aiSettings: AISettings) {
  const fullText = editor.getText() ?? ''
  const selectionEnd = editor.state.selection.to
  editor.commands.setGhostText('', selectionEnd ?? 0, true) // Show spinner

  const res = await fetch('/api/inline-ai-suggestion', {
    method: 'POST',
    body: JSON.stringify({ fullText, selectionEnd, customPrompt: aiSettings.customPrompt }),
    headers: { 'Content-Type': 'application/json' },
  })
  const suggestion = await res.json()

  editor.commands.setGhostText(suggestion.aiContent, selectionEnd ?? 0, false)
}
