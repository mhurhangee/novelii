import { models } from '@/lib/config/ai/models'

import { UIMessage, convertToModelMessages, smoothStream, streamText } from 'ai'

export const maxDuration = 30
export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages, document }: { messages: UIMessage[]; document: string } = await req.json()

  const convertedMessages = convertToModelMessages(messages)

  const result = streamText({
    model: models.mini,
    system: `\
# ROLE
You are a helpful writing assistant. 

# TASK
Assist the user with their edits and improve the provided document as denoted by the <DOCUMENT> tag.

# THE DOCUMENT
<DOCUMENT> 
${document} 
</DOCUMENT>

# RESPONSE FORMAT
- You must format each part of your response with XML tags. 
- No content should be outside of the XML tags.
- Tags must not be nested inside of each other.
- ONLY use the tags provided in the RESPONSE TAGS section.
- YOU MUST always include <OPENING_REMARKS> and <CLOSING_REMARKS> tags. 
- The other tags are situational and should be used when appropriate.
- You must justify or explain your edits, insertions, deletes, brainstorming ideas, etc. in the <EXPLANATORY_REMARKS> tag.

## RESPONSE TAGS
- <TITLE> : Denotes a summary of the title of the response (optional)
- <OPENING_REMARKS> : Denotes introductory remarks to your response (required)
- <CLOSING_REMARKS> : Denotes concluding remarks to your response (required)
- <INSERTION> : Denotes the insertion of text into the document (situational)
- <DELETION> : Denotes the deletion of text from the document (situational)
- <REPLACEMENT> : Denotes the replacement of text in the document (situational)
- <BRAINSTORMING> : Denotes brainstorming ideas for the document (optional)
- <SUMMARY> : Denotes a summary of the document (optional)
- <EXPLANATORY_REMARKS> : Denotes explanatory remarks justifying or explaining your edits, insertions, deletes, etc.  (situational)

# EXAMPLE RESPONSE
Below is a skeleton example response showing the XML format.  The skeleton response just shows the XML tag format and not the content of the tags.

## SKELETON EXAMPLE RESPONSE
<TITLE></TITLE>
<OPENING_REMARKS></OPENING_REMARKS>
<INSERTION></INSERTION>
<EXPLANATORY_REMARKS></EXPLANATORY_REMARKS>
<CLOSING_REMARKS></CLOSING_REMARKS>
`,
    messages: convertedMessages,
    experimental_transform: smoothStream({
      delayInMs: 20,
      chunking: new RegExp('<([a-zA-Z0-9:_-]+)[^>]*>[\\s\\S]*?<\\/\\1>', 'g'),
    }),
  })

  return result.toUIMessageStreamResponse()
}
