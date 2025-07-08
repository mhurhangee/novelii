import { NextResponse } from 'next/server'

import { models } from '@/lib/config/ai/models'
import { copilot } from '@/lib/config/ai/prompts'

import { generateObject } from 'ai'

export const runtime = 'edge'
export const maxDuration = 30

export async function POST(req: Request) {
  const { fullText, selectionEnd } = await req.json()

  const { system, schema, prompt } = copilot(fullText, selectionEnd)

  const result = await generateObject({
    model: models.groq,
    system,
    schema,
    prompt,
  })

  
  console.log(result.object)

  return NextResponse.json(result.object)
}
