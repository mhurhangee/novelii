import type { Editor as TiptapEditor } from '@tiptap/react'

export async function fetchSuggestion(editor: TiptapEditor) {
  const fullText = editor.getText() ?? ''
  const selectionEnd = editor.state.selection.to
  editor.commands.setGhostText('', selectionEnd ?? 0, true) // Show spinner

  const res = await fetch('/api/copilot', {
    method: 'POST',
    body: JSON.stringify({ fullText, selectionEnd }),
    headers: { 'Content-Type': 'application/json' },
  })
  const suggestion = await res.json()
  editor.commands.setGhostText(suggestion.aiContent, selectionEnd ?? 0, false)
}
