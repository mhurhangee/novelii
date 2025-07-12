import { NextResponse } from 'next/server'

import { models } from '@/lib/config/ai/models'
import { bubbleMenu } from '@/lib/config/ai/prompts'

import { generateObject } from 'ai'

export const runtime = 'edge'
export const maxDuration = 30

export async function POST(req: Request) {
  const { command, selected, fullMarkdown, aiSettings } = await req.json()

  const { system, schema, prompt } = bubbleMenu(command, selected, fullMarkdown, aiSettings)

  const result = await generateObject({
    model: models.groq,
    system,
    schema,
    prompt,
  })

  return NextResponse.json({
    modifiedText: result.object.modifiedText,
    reasoning: result.object.reasoning,
  })
}
