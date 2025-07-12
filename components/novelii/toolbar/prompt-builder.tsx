"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Wand2 } from "lucide-react"
import { toast } from "sonner"
import type { AISettings } from "../editor"

const documentTypes = [
  "blog post",
  "email",
  "social media post",
  "product description",
  "press release",
  "technical documentation",
  "marketing copy",
  "proposal",
  "report",
  "presentation",
]

const audiences = [
  "general public",
  "professionals",
  "students",
  "executives",
  "technical experts",
  "customers",
  "investors",
  "colleagues",
  "beginners",
  "advanced users",
]

const tones = [
  "professional",
  "casual",
  "friendly",
  "formal",
  "conversational",
  "authoritative",
  "enthusiastic",
  "empathetic",
  "persuasive",
  "informative",
]

const styles = [
  "clear and concise",
  "detailed and comprehensive",
  "creative and engaging",
  "analytical and data-driven",
  "storytelling",
  "instructional",
  "persuasive",
  "academic",
  "journalistic",
  "technical",
]

interface PromptBuilderProps {
  aiSettings: AISettings
  setAiSettings: (aiSettings: AISettings) => void
}

export function PromptBuilder({ aiSettings, setAiSettings }: PromptBuilderProps) {
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const generatedPrompt = useMemo(() => {
    const template = [
      aiSettings.documentType && `\n - I am writing ${aiSettings.documentType}.`,
      aiSettings.audience && `\n - It is for a ${aiSettings.audience} audience.`,
      aiSettings.tone && `\n - Write in a ${aiSettings.tone} tone.`,
      aiSettings.documentType && aiSettings.purpose && `\n - The purpose of the ${aiSettings.documentType} is to ${aiSettings.purpose}.`,
      !aiSettings.documentType && aiSettings.purpose && `\n - The purpose is to ${aiSettings.purpose}.`,
      aiSettings.style && `\n - Use a ${aiSettings.style} writing style.`,
      aiSettings.context && `\n - Here's some context: \n${aiSettings.context}.`,
      aiSettings.additionalInstructions && `\n - Please additionally follow these instructions: \n${aiSettings.additionalInstructions}.`,
    ]
      .filter(Boolean)
      .join(' ') || 'Please provide writing instructions.'

    return template
  }, [aiSettings])

  const displayPrompt = isEditing ? aiSettings.customPrompt : generatedPrompt

  const handleSettingChange = (key: keyof AISettings, value: string) => {
    const updatedSettings = { ...aiSettings, [key]: value }
    setAiSettings(updatedSettings)
    if (isEditing) {
      setIsEditing(false)
    }
  }

  const handlePromptEdit = (value: string) => {
    const updatedSettings = { ...aiSettings, customPrompt: value }
    setAiSettings(updatedSettings)
    setIsEditing(true)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(displayPrompt)
      toast.success("Copied!")
    } catch (err) {
      toast.error("Failed to copy prompt")
    }
  }

  const resetForm = () => {
    setAiSettings({
      documentType: "",
      audience: "",
      tone: "",
      purpose: "",
      style: "",
      context: "",
      additionalInstructions: "",
      customPrompt: "",
    })
    setIsEditing(false)
  }

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <Wand2 className="w-4 h-4" />
            Build AI Prompt
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] !max-w-none w-[90vw] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5" />
              AI Prompt Builder
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to automatically generate a customized AI prompt. You can edit the final prompt as
              needed.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Document Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Document Type</Label>
                      <Select
                        value={aiSettings.documentType}
                        onValueChange={(value) => handleSettingChange("documentType", value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          {documentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Target Audience</Label>
                      <Select value={aiSettings.audience} onValueChange={(value) => handleSettingChange("audience", value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select target audience" />
                        </SelectTrigger>
                        <SelectContent>
                          {audiences.map((audience) => (
                            <SelectItem key={audience} value={audience}>
                              {audience}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Tone</Label>
                      <Select value={aiSettings.tone} onValueChange={(value) => handleSettingChange("tone", value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          {tones.map((tone) => (
                            <SelectItem key={tone} value={tone}>
                              {tone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Writing Style</Label>
                      <Select value={aiSettings.style} onValueChange={(value) => handleSettingChange("style", value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select writing style" />
                        </SelectTrigger>
                        <SelectContent>
                          {styles.map((style) => (
                            <SelectItem key={style} value={style}>
                              {style}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Purpose</Label>
                    <Input
                      placeholder="e.g., inform readers about new features"
                      value={aiSettings.purpose}
                      onChange={(e) => handleSettingChange("purpose", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Context</Label>
                    <Textarea
                      placeholder="Provide any relevant background information or context..."
                      value={aiSettings.context}
                      onChange={(e) => handleSettingChange("context", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Instructions</Label>
                    <Textarea
                      placeholder="e.g., include statistics, use bullet points, keep it under 500 words"
                      value={aiSettings.additionalInstructions}
                      onChange={(e) => handleSettingChange("additionalInstructions", e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Prompt Preview Section */}
            <div className="space-y-4 md:sticky md:top-4 md:self-start">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Generated Prompt
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2 bg-transparent">
                        <Copy className="w-4 h-4" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={resetForm}>
                        Reset
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="prompt">{isEditing ? "Custom Prompt (Edited)" : "Auto-Generated Prompt"}</Label>
                    <Textarea
                      id="prompt"
                      value={displayPrompt}
                      onChange={(e) => handlePromptEdit(e.target.value)}
                      rows={12}
                      className="font-mono text-sm"
                      placeholder="Your prompt will appear here as you fill out the form..."
                    />
                    {isEditing && (
                      <p className="text-sm text-muted-foreground">
                        You've customized this prompt. Changes to the form above won't update it automatically.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button onClick={() => setOpen(false)} className="flex-1" disabled={!displayPrompt.trim()}>
                  Use This Prompt
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  )
}
