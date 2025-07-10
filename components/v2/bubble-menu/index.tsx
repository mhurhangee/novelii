'use client'

import { useState } from 'react'

import { type Editor, BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'
import { AiCommand } from './ai-command'
import { markdownToTiptapContent } from '../utils/markdown'
import { addMarkToAllTextNodes } from '../utils/add-mark-to-all-nodes'
import { Loading } from './loading'

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
                if (replaceSelected) { // Replace selected text with modified text
                    
                    // 1. Mark selected text as deleted (ai_delete)
                    editor
                        .chain()
                        .focus()
                        .setMark('ai_delete', { reason: data.reasoning })
                        .run()
                    
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
                    
                } else {// Insert modified text after selection
                    
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
            {!isLoading && <AiCommand onSubmit={handleSubmit} editor={editor} />}
            {isLoading && <Loading />}
        </TiptapBubbleMenu>)
}