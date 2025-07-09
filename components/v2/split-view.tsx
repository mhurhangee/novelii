import { Editor as TiptapEditor } from "@tiptap/react"
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable"
import { NovelliEditor } from "./novelli-editor"
import { NovelliAssistant } from "./novelli-assistant"

export const SplitView = ({ editor }: { editor: TiptapEditor }) => {
    return (
        <main className="mx-auto h-screen w-screen font-sans">
            <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-120px)] border">
                <ResizablePanel defaultSize={50}>
                    <NovelliEditor editor={editor} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50}>
                    <NovelliAssistant editor={editor} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </main>
    )
}