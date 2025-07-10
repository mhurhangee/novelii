'use client'

import { Editor } from '@tiptap/react'

import { Button } from '@/components/ui/button'

import { getActiveAiMark, getAiMarkMetadata } from '../extensions/ai-marks/utils'

export const AiMarkMenu = ({
  editor,
  handleAccept,
  handleReject,
}: {
  editor: Editor
  handleAccept: (mark: string) => void
  handleReject: (mark: string) => void
}) => {
  return (
    <div className="bg-popover text-popover-foreground flex h-full w-full max-w-xs min-w-64 flex-col gap-2 overflow-hidden rounded-lg rounded-md border p-3 shadow-md md:min-w-[450px]">
      <div className="rounded p-2 text-xs">
        <span>{getAiMarkMetadata(editor) || 'No reasoning provided.'}</span>
      </div>
      <div className="mt-2 flex gap-2">
        <Button
          className="rounded px-3 py-1 text-xs font-medium text-green-800"
          size="sm"
          variant="accept"
          onClick={() => handleAccept(getActiveAiMark(editor) || '')}
        >
          Accept
        </Button>
        <Button
          className="rounded px-3 py-1 text-xs font-medium"
          size="sm"
          variant="reject"
          onClick={() => handleReject(getActiveAiMark(editor) || '')}
        >
          Reject
        </Button>
      </div>
    </div>
  )
}
