import type { Editor } from '@tiptap/react'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

import { bubbleMenuOptions } from '@/lib/config/ai/bubble-menu-options'

import { Send, X } from 'lucide-react'

export function AiCommandMenu({
  onSubmit,
  editor,
}: {
  onSubmit: (command: string) => void
  editor: Editor | null
}) {
  const [input, setInput] = useState('')

  function handleSelect(suggestion: string) {
    setInput(suggestion)
  }

  function handleButtonClick() {
    if (input.trim()) {
      onSubmit(input)
    }
  }

  if (!editor) {
    return null
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Ask an AI</CardTitle>
        <CardDescription>Select an option or send a custom prompt to the AI</CardDescription>
      </CardHeader>
      <CardContent>
        <Command>
          <CommandInput
            placeholder="Type an AI command..."
            value={input}
            onValueChange={setInput}
            onKeyDown={e => {
              if (e.key === 'Enter') e.preventDefault() // prevent Enter submit
            }}
          />
          <CommandList>
            {bubbleMenuOptions.map(s => (
              <CommandItem key={s.value} value={s.value} onSelect={() => handleSelect(s.value)}>
                {s.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              // Remove selection by setting the cursor at the end, should close the bubble menu
              const endPos = editor.state.doc.content.size
              editor.chain().setTextSelection(endPos).run()
              // Close bubble menu
              editor.commands.blur()
            }}
          >
            <X />
          </Button>
          <Button type="button" size="icon" onClick={handleButtonClick}>
            <Send />
          </Button>
        </div>
      </CardFooter>
    </>
  )
}
