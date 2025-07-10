import { Loader2Icon } from 'lucide-react'

export const Loading = () => {
  return (
    <div className="bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-lg border p-4 shadow-md">
      <div className="flex animate-pulse items-center gap-2">
        <Loader2Icon className="animate-spin" />
        Thinking...
      </div>
    </div>
  )
}
