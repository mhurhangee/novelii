"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo, Sparkles, Type } from "lucide-react"
import { AISuggestions } from "./ai-suggestions"
import { AIAutocomplete } from "./ai-autocomplete"

export default function TiptapEditor() {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [autocomplete, setAutocomplete] = useState<{
    show: boolean
    trigger: string
    context: string
    position: { top: number; left: number }
  }>({
    show: false,
    trigger: "",
    context: "",
    position: { top: 0, left: 0 },
  })

  const editorRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing... Press Ctrl+Space for AI assistance",
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-8",
      },
    },
    onUpdate: ({ editor }) => {
      // Check for AI trigger
      const text = editor.getText()
      const selection = editor.state.selection
      const currentPos = selection.from

      // Look for trigger patterns (e.g., "++", "/ai", etc.)
      const beforeCursor = text.slice(Math.max(0, currentPos - 20), currentPos)

      if (beforeCursor.endsWith("++") || beforeCursor.endsWith("/ai")) {
        const rect = editorRef.current?.getBoundingClientRect()
        if (rect) {
          setAutocomplete({
            show: true,
            trigger: beforeCursor.slice(-10),
            context: text.slice(Math.max(0, currentPos - 200), currentPos),
            position: {
              top: rect.top + 100,
              left: rect.left + 50,
            },
          })
        }
      }
    },
  })

  const handleAcceptCompletion = useCallback(
    (completion: string) => {
      if (editor) {
        // Remove the trigger text and insert completion
        const currentPos = editor.state.selection.from
        const triggerLength = autocomplete.trigger.includes("++") ? 2 : 3

        editor
          .chain()
          .focus()
          .deleteRange({ from: currentPos - triggerLength, to: currentPos })
          .insertContent(completion)
          .run()
      }

      setAutocomplete((prev) => ({ ...prev, show: false }))
    },
    [editor, autocomplete.trigger],
  )

  const handleRejectCompletion = useCallback(() => {
    setAutocomplete((prev) => ({ ...prev, show: false }))
  }, [])

  const handleApplySuggestion = useCallback(
    (suggestion: string) => {
      if (editor) {
        editor.chain().focus().selectAll().insertContent(suggestion).run()
      }
    },
    [editor],
  )

  const triggerAI = useCallback(() => {
    const text = editor?.getText() || ""
    const rect = editorRef.current?.getBoundingClientRect()

    if (rect && text.trim()) {
      setAutocomplete({
        show: true,
        trigger: text.slice(-20),
        context: text,
        position: {
          top: rect.top + 100,
          left: rect.left + 50,
        },
      })
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Toolbar */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="flex items-center gap-1 p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-muted" : ""}
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-muted" : ""}
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-muted" : ""}
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-muted" : ""}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "bg-muted" : ""}
          >
            <Quote className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6" />

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

          <Separator orientation="vertical" className="h-6" />

          <Button variant="ghost" size="sm" onClick={triggerAI} className="text-blue-600">
            <Sparkles className="h-4 w-4 mr-1" />
            AI
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className={showSuggestions ? "bg-muted" : ""}
          >
            <Type className="h-4 w-4 mr-1" />
            Suggestions
          </Button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex gap-4">
        {/* Main Editor */}
        <div className="flex-1 relative" ref={editorRef}>
          <EditorContent editor={editor} className="min-h-[500px] bg-background border-0 focus-within:outline-none" />

          {/* Autocomplete Popup */}
          {autocomplete.show && (
            <AIAutocomplete
              trigger={autocomplete.trigger}
              context={autocomplete.context}
              onAccept={handleAcceptCompletion}
              onReject={handleRejectCompletion}
              position={autocomplete.position}
            />
          )}
        </div>

        {/* AI Suggestions Sidebar */}
        <AISuggestions
          content={editor.getText()}
          onApplySuggestion={handleApplySuggestion}
          isVisible={showSuggestions}
        />
      </div>

      {/* Help Text */}
      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>AI Features:</strong> Type <code>++</code> or <code>/ai</code> for autocomplete, press{" "}
          <code>Ctrl+Space</code> or click the AI button for assistance, use the Suggestions panel for writing
          improvements.
        </p>
      </div>
    </div>
  )
}
