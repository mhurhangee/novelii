'use client'

import type { TableOfContentDataItem } from '@tiptap/extension-table-of-contents'
import type { Editor as TiptapEditor } from '@tiptap/react'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { ListTree } from 'lucide-react'

export const TocNavigator = ({ editor }: { editor: TiptapEditor }) => {
  const [toc, setToc] = useState<TableOfContentDataItem[]>([])

  useEffect(() => {
    if (!editor) return

    const updateToc = () => {
      const tocData = editor.storage.tableOfContents?.content || []
      console.log('tocData', tocData)
      setToc(tocData)
    }
    updateToc()
    editor.on('update', updateToc)

    // Proper cleanup
    return () => {
      editor.off('update', updateToc)
    }
  }, [editor])

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open Table of Contents">
          <ListTree />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-72 min-w-60 overflow-auto p-2">
        <div className="flex flex-col gap-1">
          {toc.length === 0 && (
            <div className="text-muted-foreground px-2 py-1 text-sm">No headings found</div>
          )}
          {toc.map(h => (
            <Button
              key={h.id}
              variant="ghost"
              className={`justify-start truncate text-left ${h.originalLevel === 1 ? `text-md font-bold` : ''} ${h.originalLevel === 2 ? `text-sm font-semibold` : ''} ${h.originalLevel === 3 ? `text-xs font-medium` : ''} `}
              style={{ paddingLeft: `${(h.originalLevel - 1) * 8 + 8}px` }} // extra indent for clarity
              onClick={() => scrollToHeading(h.id)}
            >
              <span className="truncate">{h.textContent}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
