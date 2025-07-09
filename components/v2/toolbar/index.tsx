'use client'

import { Editor as TiptapEditor } from "@tiptap/react"
import { TextAlignSelector } from "./text-align-selector"
import { NodeSelector } from "./node-selector"
import { FormattingSelector } from "./formatting-selector"
import { UndoRedo } from "./undo-redo"
import { LinkButton } from "./link-button"
import { ThemeToggle } from "./theme-toggle"

export const Toolbar = ({ editor }: { editor: TiptapEditor }) => {
    return (
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="flex items-center">
                <div className="flex justify-between w-full">
                    <div className="flex-shrink-0">
                        <NodeSelector editor={editor} />
                        <FormattingSelector editor={editor} />
                        <TextAlignSelector editor={editor} />
                        <LinkButton editor={editor} />
                    </div>
                    <div className="flex-shrink-0">
                        <ThemeToggle />
                        <UndoRedo editor={editor} />
                    </div>
                </div>
            </div>
        </div>
    )
}