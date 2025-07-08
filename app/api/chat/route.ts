import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  const { command, selected, fullMarkdown } = await req.json();

  const prompt = `<USER_INSTRUCTIONS>${command}</USER_INSTRUCTIONS>\n\n<TEXT_TO_MODIFY>${selected}</TEXT_TO_MODIFY>\n\n<FULL_DOC>${fullMarkdown}</FULL_DOC>`

  const result = await generateObject({
    model: openai('gpt-4.1-mini'),
    system: `\
You are a expert writing assistant.  
You will be given plain text to modify (denoted by <TEXT_TO_MODIFY>), which is part of a document <FULL_DOC>.
You will be given instructions (denoted by <USER_INSTRUCTIONS>) on how to modify the text to modify. 
You will return a JSON object with the modifiedText.
Format the modifiedText with markdown.
Make sure the modifiedText follows the same style as the rest of the document and fits in naturally.`,
    schema: z.object({
      modifiedText: z.string().describe('Text modified in line with user instructions and formatted as markdown'),
    }),
    prompt,
  });

  return NextResponse.json(result.object);
}