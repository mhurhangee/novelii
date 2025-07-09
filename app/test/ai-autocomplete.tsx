"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Zap } from "lucide-react"
import { generateCompletion } from "./ai-actions"

interface AIAutocompleteProps {
  trigger: string
  context: string
  onAccept: (completion: string) => void
  onReject: () => void
  position: { top: number; left: number }
}

export function AIAutocomplete({ trigger, context, onAccept, onReject, position }: AIAutocompleteProps) {
  const [completion, setCompletion] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getCompletion = async () => {
      setIsLoading(true)
      const result = await generateCompletion(trigger, context)

      if (result.success) {
        setCompletion(result.completion || "")
      }
      setIsLoading(false)
    }

    getCompletion()
  }, [trigger, context])

  return (
    <Card className="absolute z-50 w-80 shadow-lg border" style={{ top: position.top, left: position.left }}>
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-3 w-3 text-blue-500" />
          <span className="text-xs font-medium text-muted-foreground">AI Completion</span>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 py-2">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span className="text-xs text-muted-foreground">Generating...</span>
          </div>
        ) : (
          <>
            <div className="bg-muted/50 rounded p-2 mb-3">
              <p className="text-sm">{completion}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => onAccept(completion)} size="sm" className="flex-1 text-xs">
                Accept
              </Button>
              <Button onClick={onReject} variant="outline" size="sm" className="flex-1 text-xs">
                Reject
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
