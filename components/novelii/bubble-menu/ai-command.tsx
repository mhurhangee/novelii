import type { Editor } from '@tiptap/react'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import { Send, X } from 'lucide-react'

import { aiCommandOptions } from './ai-command-options'

interface AiCommandProps {
  onSubmit: (command: string, replaceSelected: boolean) => void
  editor: Editor | null
}

export function AiCommand({ onSubmit, editor }: AiCommandProps) {
  const [input, setInput] = useState('')
  const [replaceSelected, setReplaceSelected] = useState(false)

  function handleSelect(suggestion: string, replaceSelected: boolean) {
    setInput(suggestion)
    setReplaceSelected(replaceSelected)
  }

  function handleButtonClick() {
    if (input.trim()) {
      onSubmit(input, replaceSelected)
    }
  }

  if (!editor) {
    return null
  }

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput
        placeholder="Send a prompt to the AI..."
        value={input}
        onValueChange={setInput}
        onKeyDown={e => {
          if (e.key === 'Enter') e.preventDefault()
        }}
        className="w-full"
      />
      <div className="absolute top-0 right-0 z-50">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => setInput('')}
          className="rounded-none"
        >
          <X />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={handleButtonClick}
          className="rounded-tl-none rounded-tr-lg rounded-br-none rounded-bl-none"
        >
          <Send />
        </Button>
      </div>
      <CommandList>
        {aiCommandOptions.map(group => (
          <CommandGroup key={group.group} heading={group.group}>
            {group.options.map((option, index) => (
              <CommandItem
                key={index}
                value={option.value}
                onSelect={() => handleSelect(option.value, option.replaceSelected)}
                className="flex items-center gap-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <option.icon className="mr-1 h-4 w-4" />
                  {option.label}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  )
}
