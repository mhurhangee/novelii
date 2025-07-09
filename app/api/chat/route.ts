import { models } from '@/lib/config/ai/models'
import { chat } from '@/lib/config/ai/prompts'

import { UIMessage, convertToModelMessages, smoothStream, streamText } from 'ai'

export const maxDuration = 30
export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const convertedMessages = convertToModelMessages(messages)
  console.log(convertedMessages)

  const result = streamText({
    model: models.groq,
    system: chat.system,
    messages: convertedMessages,
    experimental_transform: smoothStream({
      delayInMs: 20,
      chunking: 'line',
    }),
  })

  return result.toUIMessageStreamResponse()
}
