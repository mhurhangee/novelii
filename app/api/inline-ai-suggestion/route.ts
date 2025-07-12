import { NextResponse } from 'next/server'

import { models } from '@/lib/config/ai/models'
import { inlineAISuggestion } from '@/lib/config/ai/prompts'

import { generateObject } from 'ai'

export const runtime = 'edge'
export const maxDuration = 30

export async function POST(req: Request) {
  const { fullText, selectionEnd, customPrompt } = await req.json()

  console.log('customPrompt', customPrompt)

  const { system, schema, prompt } = inlineAISuggestion(fullText, selectionEnd, customPrompt)

  console.log('system', system)

  const result = await generateObject({
    model: models.groq,
    system,
    schema,
    prompt,
  })

  return NextResponse.json(result.object)
}
