'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
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

import { Bubbles, Bug, Settings, Sparkles, SpellCheck } from 'lucide-react'

interface SettingsSheetProps {
  aiEnabled: boolean
  setAiEnabled: (enabled: boolean) => void
  aiBubbleEnabled: boolean
  setAiBubbleEnabled: (enabled: boolean) => void
  htmlEnabled: boolean
  setHtmlEnabled: (enabled: boolean) => void
  spellCheckEnabled: boolean
  setSpellCheckEnabled: (enabled: boolean) => void
}

export function SettingsSheet({
  aiEnabled,
  setAiEnabled,
  aiBubbleEnabled,
  setAiBubbleEnabled,
  htmlEnabled,
  setHtmlEnabled,
  spellCheckEnabled,
  setSpellCheckEnabled,
}: SettingsSheetProps) {
  return (
    <Sheet>
      <SheetTrigger className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Settings className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{appConfig.name}</SheetTitle>
          <SheetDescription>Options and settings</SheetDescription>
        </SheetHeader>
        <ScrollArea className="overflow-y-auto px-4">
          <div className="space-y-2 py-4">
            <Label className="text-xs">AI Settings</Label>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4" />
                AI Master Switch
              </p>
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm">
                <Bubbles className="h-4 w-4" />
                Bubble Menu AI
              </p>
              <Switch checked={aiBubbleEnabled} onCheckedChange={setAiBubbleEnabled} />
            </div>

            <Label className="mt-4 text-xs">Misc</Label>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm">
                <Bug className="h-4 w-4" />
                See HTML (debugging)
              </p>
              <Switch checked={htmlEnabled} onCheckedChange={setHtmlEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm">
                <SpellCheck className="h-4 w-4" />
                Browser Spell Check
              </p>
              <Switch checked={spellCheckEnabled} onCheckedChange={setSpellCheckEnabled} />
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
