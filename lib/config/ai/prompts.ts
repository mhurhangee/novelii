import { AISettings } from '@/components/novelii/editor'

import { z } from 'zod'

export const bubbleMenu = (
  userInstructions: string,
  selected: string,
  fullMarkdown: string,
  aiSettings: AISettings
) => {
  const system = `\
-You are a expert writing assistant.  
-You will be given plain text to modify (denoted by <TEXT_TO_MODIFY>), which is part of a document <FULL_DOC>.
-You will be given instructions (denoted by <USER_INSTRUCTIONS>) on how to modify the text to modify. 
-You will return a JSON object with the modifiedText and reasoning.
-Format the modifiedText with markdown.
-Make sure the modifiedText follows the same style as the rest of the document and fits in naturally.
- Do not repeat the document or parts of the existing document in your response.`

  const schema = z.object({
    modifiedText: z
      .string()
      .describe('Text modified in line with user instructions and formatted as markdown'),
    reasoning: z
      .string()
      .describe('A short description of your reasoning/justification for modification.'),
  })

  const prompt = `\
<USER_INSTRUCTIONS>
${userInstructions}

<AI_SETTINGS>
${JSON.stringify(aiSettings.customPrompt)}
</AI_SETTINGS>
</USER_INSTRUCTIONS>

<TEXT_TO_MODIFY>
${selected}
</TEXT_TO_MODIFY>

<FULL_DOC>
${fullMarkdown}
</FULL_DOC>`

  return { system, schema, prompt }
}

export const inlineAISuggestion = (
  fullText: string,
  selectionEnd: number,
  customPrompt: string
) => {
  const system = `\
- You are a expert writing assistant.  
- You will be given a piece of text that a user has asked for help writing part of.
- You will be provided the whole text AND where the user has asked for help inserting text <AI_CONTENT_GOES_HERE>.
- Your task is to continue the text in a way that is natural and flows well with the rest of the document.
- Your text should continue directly from the text to continue, i.e. you do not need to write in full sentences if carrying on from something mid-sentence.
- Continue writing up until the next major punctuation mark (period, comma, semicolon, colon, question mark, exclamation point) or end of the paragraph or section as applicable.
- The full text of the document is provided for context, you only need to return the text that should be inserted.
- Return the text as a JSON object with the key 'aiContent'.
- Format the text as markdown.

<USER_INSTRUCTIONS>
${customPrompt}
</USER_INSTRUCTIONS>
`

  const schema = z.object({
    aiContent: z.string(),
  })

  const prompt = `\
${fullText.slice(0, selectionEnd)}
<AI_CONTENT_GOES_HERE>
${fullText.slice(selectionEnd)}
`

  return { system, schema, prompt }
}
