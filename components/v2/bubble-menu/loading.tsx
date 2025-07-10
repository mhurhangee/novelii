import { Loader2Icon } from "lucide-react"

export const Loading = () => {
    return (
        <div className="flex h-full w-full flex-col overflow-hidden p-4 rounded-lg border bg-popover shadow-md text-popover-foreground">
            <div className="flex animate-pulse items-center gap-2">
                <Loader2Icon className="animate-spin" />
                Thinking...
            </div>
        </div>
    )
}