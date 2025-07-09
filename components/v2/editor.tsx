'use client'

import { useEditor } from "@tiptap/react"
import { initialContent } from "@/lib/config/initial-content"
import { SplitView } from "./split-view"
import { extensions } from "./extensions"

export const Editor = () => {
    const editor = useEditor({
            extensions: [
              ...extensions
            ],
            content: initialContent,
            immediatelyRender: false,
      })
      if (!editor) return null
      return (
        <SplitView editor={editor} />
    )
}
    


