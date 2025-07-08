import type { Editor } from '@tiptap/react'

import { PlusIcon, ReplaceIcon, RotateCwIcon, TrashIcon } from 'lucide-react'
import { marked } from 'marked'
import ReactMarkdown from 'react-markdown'

import { Button } from '../ui/button'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

interface ResponseCardProps {
  command: string
  selected: string
  response: { title: string; reasoning: string; modifiedText: string }
  fullMarkdown: string
  editor: Editor | null
  setResponse: (response: { title: string; reasoning: string; modifiedText: string } | null) => void
  handleSubmit: (command: string, selected: string, fullMarkdown: string) => void
}

export const ResponseCard = ({
  command,
  selected,
  response,
  setResponse,
  fullMarkdown,
  editor,
  handleSubmit,
}: ResponseCardProps) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <CardHeader>
        <CardTitle>AI Response</CardTitle>
        <CardDescription>
          {command} :{selected.slice(0, 20) + '...'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactMarkdown>{response.modifiedText}</ReactMarkdown>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between gap-2">
          <Button
            onClick={() => {
              setResponse(null)
            }}
            size="icon"
            variant="destructive"
          >
            <TrashIcon />
          </Button>
          <Button
            onClick={() => {
              handleSubmit(command, selected, fullMarkdown)
            }}
            size="icon"
            variant="secondary"
          >
            <RotateCwIcon />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // Insert after selection, with markdown parsed to HTML
              const html = marked.parse(response.modifiedText)
              console.log(html)
              const pos = editor.state.selection.to
              editor.chain().insertContentAt(pos, html).focus().run()
            }}
          >
            <PlusIcon /> Insert
          </Button>
          <Button
            onClick={() => {
              // Replace selection, with markdown parsed to HTML
              const html = marked.parse(response.modifiedText.trim())
              editor.chain().focus().insertContent(html).run()
            }}
          >
            <ReplaceIcon className="mr-2 h-4 w-4" />
            Replace
          </Button>
        </div>
      </CardFooter>
    </>
  )
}
