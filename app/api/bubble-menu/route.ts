import { NextResponse } from 'next/server'

import { models } from '@/lib/config/ai/models'
import { bubbleMenu } from '@/lib/config/ai/prompts'

import { generateObject } from 'ai'

export const runtime = 'edge'
export const maxDuration = 30

export async function POST(req: Request) {
  const { command, selected, fullMarkdown, replaceSelected } = await req.json()

  console.log("command", command)
  console.log("replaceSelected", replaceSelected)

  const { system, schema, prompt } = bubbleMenu(command, selected, fullMarkdown)

  const result = await generateObject({
    model: models.groq,
    system,
    schema,
    prompt,
  })
  console.log(result.object.modifiedText)

  return NextResponse.json(result.object.modifiedText)
}
