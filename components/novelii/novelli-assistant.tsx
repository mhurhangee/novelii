'use client'

import { useChat } from '@ai-sdk/react'
import { type Editor as TiptapEditor } from '@tiptap/react'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { parser, renderParsedXML } from '@/lib/parser'
import { cn } from '@/lib/utils'

import { DefaultChatTransport } from 'ai'
import { RotateCcw, Send, Square } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface NovelliAssistantProps {
  editor: TiptapEditor
}

export const NovelliAssistant = ({ editor }: NovelliAssistantProps) => {
  const [input, setInput] = useState('')

  const { messages, setMessages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    maxSteps: 1,
  })

  const messagesEndRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex h-full flex-col">
      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
        <Button
          variant="ghost"
          onClick={() => (setMessages([]), setInput(''))}
          disabled={status === 'streaming'}
        >
          <RotateCcw /> Clear chat
        </Button>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-muted-foreground flex h-32 flex-col items-center justify-center">
            <h1 className="text-center text-4xl font-bold">Novelii AI Assistant</h1>
            <p className="pt-8 text-center">
              Chat with an AI assistant to help you edit and improve your document.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div key={index} className={cn("flex w-full justify-start", msg.role === 'user' && 'justify-end')}>
                <div
                  className={cn(
                    'rounded-lg px-4 text-sm',
                    msg.role === 'user' && 'text-muted-foreground'
                  )}
                >
                  {msg.parts &&
                    msg.parts
                      .filter(part => part.type === 'text')
                      .map((part, i) => {
                        if (msg.role === 'assistant') {
                          const parsed = parser.parse(`<ROOT>${part.text}</ROOT>`)?.ROOT ?? {}
                          return <div key={i}>{renderParsedXML(parsed)}</div>
                        } else {
                          // For user, maybe just render text or Markdown
                          return <ReactMarkdown key={i}>{part.text}</ReactMarkdown>
                        }
                      })}

                  {status === 'streaming' &&
                    msg.role === 'assistant' &&
                    msg === messages[messages.length - 1] && (
                      <div className="inline-flex items-center gap-1">
                        <span className="size-1 animate-bounce rounded-full bg-current [animation-delay:0.1s]" />
                        <span className="size-1 animate-bounce rounded-full bg-current [animation-delay:0.2s]" />
                        <span className="size-1 animate-bounce rounded-full bg-current [animation-delay:0.3s]" />
                      </div>
                    )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask for editing help..."
            className="flex-1"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          {status !== 'streaming' && (
            <Button
              size="icon"
              disabled={input.trim().length === 0}
              onClick={() => (
                sendMessage(
                  { text: input },
                  {
                    body: { document: editor.storage.markdown.getMarkdown() },
                  }
                ),
                setInput('')
              )}
            >
              <Send />
            </Button>
          )}
          {status === 'streaming' && (
            <Button size="icon" onClick={() => stop()}>
              <Square />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
