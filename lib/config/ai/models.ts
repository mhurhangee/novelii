import { groq } from '@ai-sdk/groq'
import { openai } from '@ai-sdk/openai'

export const models = {
  mini: openai('gpt-4o-mini'),
  groq: groq('gemma2-9b-it'),
}
