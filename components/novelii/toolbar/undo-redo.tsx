'use client'

import { Editor as TiptapEditor } from '@tiptap/react'

import { Button } from '@/components/ui/button'

import { Redo, Undo } from 'lucide-react'

export const UndoRedo = ({ editor }: { editor: TiptapEditor }) => {
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </>
  )
}
