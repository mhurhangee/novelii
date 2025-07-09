"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Loader2 } from "lucide-react"
import { generateSuggestions, improveText } from "./ai-actions"

interface AISuggestionsProps {
  content: string
  onApplySuggestion: (suggestion: string) => void
  isVisible: boolean
}

export function AISuggestions({ content, onApplySuggestion, isVisible }: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleGetSuggestions = async () => {
    if (!content.trim()) return

    setIsLoading(true)
    const result = await generateSuggestions(content)

    if (result.success) {
      setSuggestions(result.suggestions)
    }
    setIsLoading(false)
  }

  const handleImproveSuggestion = async (instruction: string) => {
    if (!content.trim()) return

    setIsLoading(true)
    const result = await improveText(content, instruction)

    if (result.success) {
      onApplySuggestion(result.improvedText || "")
    }
    setIsLoading(false)
  }

  if (!isVisible) return null

  return (
    <Card className="w-80 border-l-4 border-l-blue-500">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">AI Assistant</span>
        </div>

        <Button
          onClick={handleGetSuggestions}
          disabled={isLoading || !content.trim()}
          variant="outline"
          size="sm"
          className="w-full"
        >
          {isLoading ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Sparkles className="h-3 w-3 mr-2" />}
          Get Suggestions
        </Button>

        {suggestions.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Suggestions:</p>
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                onClick={() => onApplySuggestion(suggestion)}
                variant="ghost"
                size="sm"
                className="w-full text-left justify-start h-auto p-2 text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Quick Actions:</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => handleImproveSuggestion("make it more concise")}
              disabled={isLoading || !content.trim()}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Shorten
            </Button>
            <Button
              onClick={() => handleImproveSuggestion("expand with more details")}
              disabled={isLoading || !content.trim()}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Expand
            </Button>
            <Button
              onClick={() => handleImproveSuggestion("fix grammar and spelling")}
              disabled={isLoading || !content.trim()}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Fix Grammar
            </Button>
            <Button
              onClick={() => handleImproveSuggestion("make it more professional")}
              disabled={isLoading || !content.trim()}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Professional
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
