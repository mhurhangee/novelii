import { models } from '@/lib/config/ai/models'
import { chat } from '@/lib/config/ai/prompts'

import { UIMessage, convertToModelMessages, smoothStream, streamText } from 'ai'

export const maxDuration = 30
export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: models.mini,
    system: chat.system,
    messages: convertToModelMessages(messages),
    experimental_transform: smoothStream({
      delayInMs: 20,
      chunking: 'line',
    }),
  })

  return result.toUIMessageStreamResponse()
}