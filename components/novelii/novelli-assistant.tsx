'use client'

import { useChat } from '@ai-sdk/react'
import { type Editor as TiptapEditor } from '@tiptap/react'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'

import { DefaultChatTransport } from 'ai'
import { Bot, Plus, Send, Square, User } from 'lucide-react'
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
  })

  const messagesEndRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <h1 className="mb-4 text-center text-3xl font-bold">Novelii Assistant</h1>
        <p className="text-muted-foreground text-center">Chat with AI about your document</p>
        {/*<Button onClick={() => editor.commands.insertContent('Hello world!')}>Insert</Button>*/}
      </div>
      <div className="flex items-center justify-end gap-2 p-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => (setMessages([]), setInput(''))}
          disabled={status === 'streaming'}
        >
          <Plus /> New chat
        </Button>
        <button
          onClick={() =>
            editor.chain().focus().setMark('ai_insert', { reason: 'Insert example' }).run()
          }
        >
          Mark as Insert
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setMark('ai_delete', { reason: 'Delete example' }).run()
          }
        >
          Mark as Delete
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setMark('ai_comment', { reason: 'Comment example' }).run()
          }
        >
          Mark as Comment
        </button>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-muted-foreground flex h-32 flex-col items-center justify-center">
            <p>
              Hi! I am Novelii, an AI assistant here to help you edit and improve your document.
            </p>
            <p>What would you like to work on?</p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div key={index} className="mb-4 flex w-full justify-start last:mb-0">
                <div className="flex items-start gap-1">
                  <div className="flex items-center justify-center rounded-full p-1">
                    {msg.role === 'user' ? (
                      <User className="text-muted-foreground mt-2 h-4 w-4" />
                    ) : (
                      <Bot className="mt-2 h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'prose dark:prose-invert rounded-lg px-4 py-2 text-sm',
                      msg.role === 'user' && 'text-muted-foreground'
                    )}
                  >
                    <ReactMarkdown>
                      {msg.parts &&
                        msg.parts
                          .filter(part => part.type === 'text')
                          .map(part => {
                            // Remove <DOCUMENT> tags and their contents from user messages
                            return msg.role === 'user'
                              ? part.text.replace(/<DOCUMENT>[\s\S]*?<\/DOCUMENT>/g, '')
                              : part.text
                          })
                          .join('')}
                    </ReactMarkdown>
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
                sendMessage({ text: '<DOCUMENT>' + editor.getHTML() + '</DOCUMENT>' + input }),
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
