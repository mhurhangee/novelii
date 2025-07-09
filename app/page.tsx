'use client'

// React
import Link from '@tiptap/extension-link'
// Tiptap extensions
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
// Tiptap core
import { type Editor as TiptapEditor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
// UI components
import { Input } from '@/components/ui/input'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ThemeToggle } from '@/components/ui/theme-toggle'

// Custom extensions and components
import { CopilotTrigger } from '@/components/copilot/copilot-trigger'
import { fetchSuggestion } from '@/components/copilot/fetch-suggestion'
import { getGhostText } from '@/components/copilot/get-ghost-text'
import { makeGhostKeydownHandler } from '@/components/copilot/ghost-keydown-handler'
import { AIGhostText } from '@/components/copilot/ghost-text'
// Editor
import { Editor } from '@/components/editor'

// Config
import { initialContent } from '@/lib/config/initial-content'

import { Bot, Send, User } from 'lucide-react'
import { Markdown } from 'tiptap-markdown'

const messages = [
  {
    role: 'assistant',
    content:
      "Hi! I'm here to help you edit and improve your document. What would you like to work on?",
  },
  { role: 'user', content: 'Can you help me make this introduction more engaging?' },
  {
    role: 'assistant',
    content:
      'I can suggest ways to make your introduction more compelling. Try starting with a question or surprising statistic.',
  },
]

export default function Page() {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Here you would typically add the message to your state
    // and then process it to interact with the editor

    // Example of how you could modify the editor content
    if (editorRef.current) {
      // This is just an example - replace with your actual editing logic
      // editorInstance.commands.insertContent(inputValue);
    }

    setInputValue('')

    // Scroll to bottom of messages
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

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
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                >
                  <div
                    className={`flex max-w-[80%] gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                      {message.role === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask for editing help..."
                  className="flex-1"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  )
}
