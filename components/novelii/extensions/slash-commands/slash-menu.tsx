// slash-menu.tsx
import type { Editor as TiptapEditor } from '@tiptap/react'

import React from 'react'

import { COMMANDS } from './slash-commands'

type Props = {
  open: boolean
  position: { top: number; left: number }
  query: string
  onClose: () => void
  editor: TiptapEditor
  range: { from: number; to: number }
  selected: number
  setSelected: (n: number) => void
}

export function SlashMenu({
  open,
  position,
  query,
  onClose,
  editor,
  range,
  selected,
  setSelected,
}: Props) {
  const filtered = COMMANDS.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))

  React.useEffect(() => {
    setSelected(0)
  }, [query, filtered.length, open, setSelected])

  if (!open) return null

  return (
    <div
      className="bg-popover absolute z-50 w-72 rounded border p-1 shadow-md"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {filtered.length === 0 && <div className="text-muted-foreground p-2 text-sm">No results</div>}
      {filtered.map((item, i) => (
        <div
          key={item.title}
          className={`flex cursor-pointer items-center rounded px-2 py-1 ${
            i === selected ? 'bg-accent' : ''
          }`}
          onClick={() => {
            item.command(editor, range)
            onClose()
          }}
          onMouseEnter={() => setSelected(i)}
        >
          <item.icon className="mr-2 size-4" />
          <div>
            <div className="font-medium">{item.title}</div>
            <div className="text-muted-foreground text-xs">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

SlashMenu.COMMANDS = COMMANDS
