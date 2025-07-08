import { NextResponse } from 'next/server'

import { models } from '@/lib/config/ai/models'
import { bubbleMenu } from '@/lib/config/ai/prompts'

import { generateObject } from 'ai'

export const runtime = 'edge'
export const maxDuration = 30

export async function POST(req: Request) {
  const { command, selected, fullMarkdown } = await req.json()

  const { system, schema, prompt } = bubbleMenu(command, selected, fullMarkdown)

  const result = await generateObject({
    model: models.mini,
    system,
    schema,
    prompt,
  })

  return NextResponse.json(result.object)
}
