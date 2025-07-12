'use client'

// Tiptap core
import { EditorContent } from '@tiptap/react'
import type { Editor as TiptapEditor } from '@tiptap/react'

import { BubbleMenu } from './bubble-menu'
import { AISettings } from './editor'
import { Toolbar } from './toolbar'

export const NovelliEditor = ({
  editor,
  aiSettings,
}: {
  editor: TiptapEditor
  aiSettings: AISettings
}) => {
  return (
    <div className="flex h-full flex-col">
      <Toolbar editor={editor} />
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
        <BubbleMenu editor={editor} aiSettings={aiSettings} />
      </div>
    </div>
  )
}
