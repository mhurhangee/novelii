import { generateJSON } from '@tiptap/react'

import { marked } from 'marked'

import { extensions } from '../components/novelii/extensions'

export function markdownToTiptapContent(markdown: string) {
  const html = marked(markdown)
  const json = generateJSON(html as string, extensions)
  return json.content
}
