'use client'

import { type Editor, BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'

import { useState } from 'react'

import { Card } from '../ui/card'
import { AiCommandMenu } from './aicommandmenu'
import { DefaultBubbleMenu } from './default-bubble-menu'
import { LoadingCard } from './loading-card'
import { ResponseCard } from './response-card'

export function BubbleMenu({ editor, aiEnabled }: { editor: Editor | null; aiEnabled: boolean }) {
  const [response, setResponse] = useState<{
    title: string
    reasoning: string
    modifiedText: string
  } | null>(null)

  const [isAIOpen, setIsAIOpen] = useState(false)
  const [command, setCommand] = useState('')
  const [selected, setSelected] = useState('')
  const [fullMarkdown, setFullMarkdown] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (!editor) {
    return null
  }

  function handleClose() {
    setResponse(null)
    setCommand('')
    setSelected('')
    setFullMarkdown('')
    setIsLoading(false)
    setIsAIOpen(false)
  }

  function handleSubmit(command: string, selected: string, fullMarkdown: string) {
    setCommand(command)
    setSelected(selected)
    setFullMarkdown(fullMarkdown)
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
      }),
    })
      .then(res => res.json())
      .then(data => {
        setResponse(data)
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
            { name: 'preventOverflow', options: { padding: 8 } }, // keeps it in viewport
            { name: 'flip', enabled: true }, // flips if not enough space
          ],
        },
        onHidden: () => {
          handleClose()
        },
        maxWidth: '95vw', // or '100vw'
      }}
    >
      {isAIOpen ? (
        <Card className="box-border w-[400px] max-w-[95vw]">
          {!response && !isLoading && aiEnabled && (
            <AiCommandMenu
              editor={editor}
              onSubmit={command => {
                const selected = editor.state.doc.textBetween(
                  editor.state.selection.from,
                  editor.state.selection.to
                )
                const fullMarkdown = editor.storage.markdown.getMarkdown()

                handleSubmit(command, selected, fullMarkdown)
              }}
            />
          )}
          {response && !isLoading && (
            <ResponseCard
              command={command}
              selected={selected}
              response={response}
              fullMarkdown={fullMarkdown}
              editor={editor}
              setResponse={setResponse}
              handleSubmit={handleSubmit}
            />
          )}
          {isLoading && <LoadingCard />}
        </Card>
      ) : (
        <DefaultBubbleMenu editor={editor} setIsAIOpen={setIsAIOpen} aiEnabled={aiEnabled} />
      )}
    </TiptapBubbleMenu>
  )
}
