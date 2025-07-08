import { openai } from '@ai-sdk/openai'
import { groq } from '@ai-sdk/groq'

export const models = {
  mini: openai('gpt-4o-mini'),
  groq: groq('gemma2-9b-it')
}
