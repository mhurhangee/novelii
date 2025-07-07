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

import { Pen } from 'lucide-react'

interface ScribeProps {
  scribeEnabled: boolean
  setScribeEnabled: (enabled: boolean) => void
}

export default function Scribe({ scribeEnabled, setScribeEnabled }: ScribeProps) {
  return (
    <Sheet>
      <SheetTrigger className="fixed right-4 bottom-4 z-50 flex items-center gap-2">
        <Pen className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Scribe</SheetTitle>
          <SheetDescription>Options and settings</SheetDescription>
        </SheetHeader>
        <ScrollArea className="overflow-y-auto px-4">
          <div className="flex items-center justify-between">
            <p>Enable Scribe</p>
            <Switch checked={scribeEnabled} onCheckedChange={setScribeEnabled} />
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
