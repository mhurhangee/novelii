import { Editor as TiptapEditor } from '@tiptap/react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import { NovelliAssistant } from './novelli-assistant'
import { NovelliEditor } from './novelli-editor'
import type { aiSettings } from './editor'

export const SplitView = ({ editor, aiSettings, setAiSettings }: { editor: TiptapEditor, aiSettings: aiSettings, setAiSettings: (aiSettings: aiSettings) => void }) => {
  return (
    <main className="mx-auto h-screen w-screen font-sans">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full border">
        <ResizablePanel defaultSize={50}>
          <NovelliEditor editor={editor} aiSettings={aiSettings} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <NovelliAssistant editor={editor} aiSettings={aiSettings} setAiSettings={setAiSettings} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  )
}
