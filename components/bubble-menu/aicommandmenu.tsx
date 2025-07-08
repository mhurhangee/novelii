import type { Editor } from '@tiptap/react'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

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
      <CardContent>
        <Command>
          <CommandInput
            placeholder="Send a prompt to the AI..."
            value={input}
            onValueChange={setInput}
            onKeyDown={e => {
              if (e.key === 'Enter') e.preventDefault()
            }}
          />
          <CommandList>
            {bubbleMenuOptions.map(group => (
              <CommandGroup key={group.group} heading={group.group}>
                {group.options.map((option, index) => (
                  <CommandItem
                    key={index}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="flex items-center gap-2 text-xs"
                  >
                    <option.icon className="mr-2 h-4 w-4" /> {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
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
