import { z } from 'zod'

export const bubbleMenu = (userInstructions: string, selected: string, fullMarkdown: string) => {
  const system = `\
-You are a expert writing assistant.  
-You will be given plain text to modify (denoted by <TEXT_TO_MODIFY>), which is part of a document <FULL_DOC>.
-You will be given instructions (denoted by <USER_INSTRUCTIONS>) on how to modify the text to modify. 
-You will return a JSON object with the modifiedText.
-Format the modifiedText with markdown.
-Make sure the modifiedText follows the same style as the rest of the document and fits in naturally.`

  const schema = z.object({
    modifiedText: z
      .string()
      .describe('Text modified in line with user instructions and formatted as markdown'),
  })

  const prompt = `\
<USER_INSTRUCTIONS>
${userInstructions}
</USER_INSTRUCTIONS>

<TEXT_TO_MODIFY>
${selected}
</TEXT_TO_MODIFY>

<FULL_DOC>
${fullMarkdown}
</FULL_DOC>`

  return { system, schema, prompt }
}
