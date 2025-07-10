import type { JSONContent } from '@tiptap/react'
type MarkSpec = { type: string; attrs?: Record<string, any> }

export function addMarkToAllTextNodes(node: JSONContent | JSONContent[], mark: MarkSpec): JSONContent | JSONContent[] {
  if (Array.isArray(node)) return node.map(n => addMarkToAllTextNodes(n, mark) as JSONContent)
  if (node.type === 'text') {
    node.marks = node.marks || []
    node.marks.push(mark)
  }
  if (node.content) {
    node.content = addMarkToAllTextNodes(node.content, mark) as JSONContent[]
  }
  return node
}