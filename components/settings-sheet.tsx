'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'

import { appConfig } from '@/lib/config/app'

import { Bug, Settings, Sparkles } from 'lucide-react'

interface SettingsSheetProps {
  aiEnabled: boolean
  setAiEnabled: (enabled: boolean) => void
  htmlEnabled: boolean
  setHtmlEnabled: (enabled: boolean) => void
}

export function SettingsSheet({
  aiEnabled,
  setAiEnabled,
  htmlEnabled,
  setHtmlEnabled,
}: SettingsSheetProps) {
  return (
    <Sheet>
      <SheetTrigger className="fixed right-4 bottom-4 z-50 flex items-center gap-2">
        <Settings className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{appConfig.name}</SheetTitle>
          <SheetDescription>Options and settings</SheetDescription>
        </SheetHeader>
        <ScrollArea className="overflow-y-auto px-4">
          <div className="space-y-2 py-4">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Master Switch
              </p>
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2">
                <Bug className="h-4 w-4" />
                See HTML (debugging)
              </p>
              <Switch checked={htmlEnabled} onCheckedChange={setHtmlEnabled} />
            </div>
          </div>
        </ScrollArea>
        <SheetFooter className="flex justify-end">
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
