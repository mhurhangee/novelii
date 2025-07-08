import { Editor } from '@tiptap/react'

import { Button } from '../ui/button'
import { NodeSelector } from './selectors/node-selector'
import { TextAlignSelector } from './selectors/text-align-selector'
import { TextButtons } from './selectors/text-buttons'

interface DefaultBubbleMenuProps {
  editor: Editor | null
  setIsAIOpen: (open: boolean) => void
  aiEnabled: boolean
}

export const DefaultBubbleMenu = ({ editor, setIsAIOpen, aiEnabled }: DefaultBubbleMenuProps) => {
  if (!editor) return <>Editor not found</>
  return (
    <div className="bg-background box-border flex w-fit max-w-[95vw] rounded-md border">
      {aiEnabled && (
        <Button
          variant="default"
          className="rounded-l-md rounded-r-none"
          onClick={() => setIsAIOpen(true)}
        >
          AI
        </Button>
      )}
      <NodeSelector editor={editor} />
      <TextButtons editor={editor} />
      <TextAlignSelector editor={editor} />
    </div>
  )
}
