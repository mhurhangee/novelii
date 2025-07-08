import { Editor } from '@tiptap/react'

import { Button } from '@/components/ui/button'

import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'

export function TextAlignButtons({ editor }: { editor: Editor }) {
  if (!editor) return null

  const items = [
    {
      name: 'Left',
      icon: AlignLeftIcon,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: editor.isActive({ textAlign: 'left' }),
    },
    {
      name: 'Center',
      icon: AlignCenterIcon,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: editor.isActive({ textAlign: 'center' }),
    },
    {
      name: 'Right',
      icon: AlignRightIcon,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: editor.isActive({ textAlign: 'right' }),
    },
  ]

  return (
    <div className="flex gap-1">
      {items.map(item => (
        <Button
          key={item.name}
          variant={item.isActive ? 'default' : 'ghost'}
          size="icon"
          onClick={item.onClick}
        >
          <item.icon className="size-4" />
        </Button>
      ))}
    </div>
  )
}
