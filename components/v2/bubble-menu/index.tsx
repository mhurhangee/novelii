'use client'

import { useState } from 'react'

import { type Editor, BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'
import { AiCommand } from './ai-command'

interface BubbleMenuProps {
    editor: Editor
}

export const BubbleMenu = ({ editor }: BubbleMenuProps) => {
    const [command, setCommand] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(command: string, replaceSelected: boolean) {

        const selected = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to
        )
        const fullMarkdown = editor.storage.markdown.getMarkdown()

        setCommand(command)
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
                    const { to } = editor.state.selection

                    // 1. Mark selected text as deleted (ai_delete)
                    editor
                        .chain()
                        .focus()
                        .setMark('ai_delete', { reason: 'AI delete' })
                        .run()

                    // 2. Move cursor to after the selection
                    editor.commands.setTextSelection(to)

                    // 3. Insert new content with ai_insert mark
                    editor
                        .chain()
                        .focus()
                        .insertContent({
                            type: 'text',
                            text: data,
                            marks: [
                                { type: 'ai_insert', attrs: { reason: 'AI insert' } }
                            ]
                        })
                        .unsetMark('ai_insert')
                        .run()
                } else {
                    // 1. Move cursor to after the selection (if you want to always insert after selection)
                    //    Or use current cursor position if nothing selected

                    // For "after selection" insert:
                    const { to } = editor.state.selection
                    editor.commands.setTextSelection(to)

                    // 2. Insert new content with ai_insert mark
                    editor
                        .chain()
                        .focus()
                        .insertContent({
                            type: 'text',
                            text: data,
                            marks: [
                                { type: 'ai_insert', attrs: { reason: 'AI insert' } }
                            ]
                        })
                        .unsetMark('ai_insert')
                        .run()
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
        >
            <AiCommand onSubmit={handleSubmit} editor={editor} />
        </TiptapBubbleMenu>)
}