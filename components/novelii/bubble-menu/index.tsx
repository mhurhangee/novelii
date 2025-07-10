'use client'

import { type Editor, BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'

import { useState } from 'react'

import { addMarkToAllTextNodes } from '@/lib/add-mark-to-all-nodes'
import { markdownToTiptapContent } from '@/lib/markdown'

import {
  clearActiveAiMark,
  deleteActiveAiMarkedText,
  isInAiMark,
  isNormalSelection,
} from '../extensions/ai-marks/utils'
import { AiCommand } from './ai-command'
import { AiMarkMenu } from './ai-mark-menu'
import { Loading } from './loading'

interface BubbleMenuProps {
  editor: Editor
}

export const BubbleMenu = ({ editor }: BubbleMenuProps) => {
  const [isLoading, setIsLoading] = useState(false)

  function handleAccept(mark: string) {
    if (mark === 'ai_insert') {
      // Accept: keep text, remove mark
      clearActiveAiMark(editor)
      // Move cursor after the affected range
      const { to } = editor.state.selection
      editor.commands.setTextSelection(to)
    } else if (mark === 'ai_delete') {
      // Accept: delete marked text
      const { from } = editor.state.selection
      deleteActiveAiMarkedText(editor)
      // No need to unset mark, as text is deleted
      // Move cursor to new position (now at start of deleted range)
      const pos = Math.min(from, editor.state.doc.content.size)
      editor.commands.setTextSelection(pos)
    }
  }

  function handleReject(mark: string) {
    if (mark === 'ai_insert') {
      // Reject: remove inserted text
      deleteActiveAiMarkedText(editor)
      // Move cursor to new position (now at start of deleted range)
      const { from } = editor.state.selection
      editor.commands.setTextSelection(from)
    } else if (mark === 'ai_delete') {
      // Reject: keep text, remove mark
      clearActiveAiMark(editor)
      // Move cursor after affected range
      const { to } = editor.state.selection
      editor.commands.setTextSelection(to)
    }
  }

  function handleSubmit(command: string, replaceSelected: boolean) {
    const selected = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to
    )
    const fullMarkdown = editor.storage.markdown.getMarkdown()

    setIsLoading(true)

    fetch('/api/bubble-menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        command,
        selected,
        fullMarkdown,
        replaceSelected,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (replaceSelected) {
          // Replace selected text with modified text

          // 1. Mark selected text as deleted (ai_delete)
          editor.chain().focus().setMark('ai_delete', { reason: data.reasoning }).run()

          // 2. Move cursor to after the selection
          const { to } = editor.state.selection
          editor.commands.setTextSelection(to)

          // 3. Convert markdown to tiptap content
          const json = markdownToTiptapContent(data.modifiedText)

          // 4. Add ai_insert mark to all text nodes
          const mark = { type: 'ai_insert', attrs: { reason: data.reasoning } }
          const markedContent = addMarkToAllTextNodes(json, mark)

          // 5. Insert marked content
          editor.commands.insertContent(markedContent)
          // 6. unset ai_insert mark
          editor.chain().unsetMark('ai_insert').run()
        } else {
          // Insert modified text after selection

          // 1. Move cursor to after the selection
          const { to } = editor.state.selection
          editor.commands.setTextSelection(to)

          // 2. Convert markdown to tiptap content
          const json = markdownToTiptapContent(data.modifiedText)

          // 3. Add ai_insert mark to all text nodes
          const mark = { type: 'ai_insert', attrs: { reason: data.reasoning } }
          const markedContent = addMarkToAllTextNodes(json, mark)

          // 4. Insert marked content
          editor.commands.insertContent(markedContent)
          // 5. unset ai_insert mark
          editor.chain().unsetMark('ai_insert').run()
        }
        setIsLoading(false)
      })
  }

  return (
    <TiptapBubbleMenu
      editor={editor}
      tippyOptions={{
        placement: 'bottom-start',
        hideOnClick: false,
        popperOptions: {
          modifiers: [
            { name: 'preventOverflow', options: { padding: 8 } },
            { name: 'flip', enabled: true },
          ],
        },
        maxWidth: '95vw',
      }}
      shouldShow={() => {
        if (isInAiMark(editor)) return true
        if (isNormalSelection(editor)) return true
        return false
      }}
    >
      {!isLoading && !isInAiMark(editor) && isNormalSelection(editor) && (
        <AiCommand onSubmit={handleSubmit} editor={editor} />
      )}
      {isLoading && <Loading />}
      {isInAiMark(editor) && (
        <AiMarkMenu editor={editor} handleAccept={handleAccept} handleReject={handleReject} />
      )}
    </TiptapBubbleMenu>
  )
}
