'use client'

import { Editor as TiptapEditor } from '@tiptap/react'

import { ExportDialog } from './export-dialog'
import { FormattingSelector } from './formatting-selector'
import { LinkButton } from './link-button'
import { NodeSelector } from './node-selector'
import { TextAlignSelector } from './text-align-selector'
import { ThemeToggle } from './theme-toggle'
import { UndoRedo } from './undo-redo'

export const Toolbar = ({ editor }: { editor: TiptapEditor }) => {
  return (
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
      <div className="flex items-center">
        <div className="flex w-full justify-between">
          <div className="flex-shrink-0">
            <NodeSelector editor={editor} />
            <FormattingSelector editor={editor} />
            <TextAlignSelector editor={editor} />
            <LinkButton editor={editor} />
          </div>
          <div className="flex-shrink-0">
            <ThemeToggle />
            <ExportDialog editor={editor} />
            <UndoRedo editor={editor} />
          </div>
        </div>
      </div>
    </div>
  )
}
