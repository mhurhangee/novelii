'use client'

// React
import { useEffect, useRef, useState } from 'react'
// UI components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ThemeToggle } from '@/components/ui/theme-toggle'
// Tiptap extensions
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { Markdown } from 'tiptap-markdown'
import Link from '@tiptap/extension-link'
// Tiptap core
import { type Editor as TiptapEditor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
// Editor
import { Editor } from '@/components/editor'
// Custom extensions and components
import { CopilotTrigger } from '@/components/copilot/copilot-trigger'
import { fetchSuggestion } from '@/components/copilot/fetch-suggestion'
import { getGhostText } from '@/components/copilot/get-ghost-text'
import { makeGhostKeydownHandler } from '@/components/copilot/ghost-keydown-handler'
import { AIGhostText } from '@/components/copilot/ghost-text'
// Config
import { cn } from '@/lib/utils'
import { initialContent } from '@/lib/config/initial-content'
// AI
import { DefaultChatTransport } from 'ai'
import { useChat } from '@ai-sdk/react'
// Icons
import { Bot, Send, User } from 'lucide-react'
// Markdown
import ReactMarkdown from 'react-markdown'



export default function Page() {
  const [input, setInput] = useState('')

  const editorRef = useRef<TiptapEditor | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder,
      Markdown,
      Underline,
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CopilotTrigger.configure({
        onTrigger: () => editorRef.current && fetchSuggestion(editorRef.current),
      }),
      AIGhostText,
    ],
    content: initialContent,
    immediatelyRender: false,
    onCreate({ editor }) {
      editorRef.current = editor
    },
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
      handleDOMEvents: {
        keydown: makeGhostKeydownHandler(editorRef, () => getGhostText(editorRef.current)),
      },
    },
  })

  const { messages, setMessages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat'
    })
  })

  const messagesEndRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])


  return (
    <main className="mx-auto h-screen w-screen font-sans">
      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-120px)] border">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full flex-col">
            <div className="fixed top-4 left-4 z-1000">
              <ThemeToggle />
            </div>
            <div className="p-4">
              <h1 className="mb-4 text-center text-3xl font-bold">Novelii Editor</h1>
              <p className="text-muted-foreground text-center">Write your document here</p>
            </div>
            {editor ? <Editor editor={editor} /> : null}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full flex-col">
            <div className="p-4">
              <h1 className="mb-4 text-center text-3xl font-bold">Novelii Assistant</h1>
              <p className="text-muted-foreground text-center">Chat with AI about your document</p>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="text-muted-foreground flex h-32 flex-col items-center justify-center">
                  <p>Hi! I'm here to help you edit and improve your document. What would you like to work on?</p>
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
                        <div className={cn('rounded-lg px-4 py-2 text-sm', msg.role === 'user' && 'text-muted-foreground')}>
                          {msg.parts &&
                            msg.parts.map(part => {
                              switch (part.type) {
                                case 'tool-textSearch':
                                  return 'Asking for confirmation...'
                                default:
                                  return ''
                              }
                            })}
                          <ReactMarkdown>
                            {msg.parts &&
                              msg.parts
                                .filter(part => part.type === 'text')
                                .map(part => part.text)
                                .join('')}
                          </ReactMarkdown>
                          {status === 'streaming' && msg.role === 'assistant' && (msg === messages[messages.length - 1]) && (
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
              <form
                onSubmit={e => {
                  e.preventDefault()
                  sendMessage({ text: input })
                  setInput('')
                }}
                className="w-full"
              >
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask for editing help..."
                    className="flex-1"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  />
                  <Button size="icon" type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  )
}
