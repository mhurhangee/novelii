// ai-marks.ts
import { Mark, mergeAttributes } from '@tiptap/react'

export function createAiMark(name: string, color: string, extraCSS = '') {
  return Mark.create({
    name,
    addOptions() {
      return { HTMLAttributes: {} }
    },
    addAttributes() {
      return {
        reason: {
          default: null,
          parseHTML: element => element.getAttribute('data-reason'),
          renderHTML: attributes =>
            attributes.reason
              ? { 'data-reason': attributes.reason }
              : {},
        },
        // Add more attributes here if needed (author, timestamp, etc)
      }
    },
    parseHTML() {
      return [{ tag: `mark.ai-${name}` }]
    },
    renderHTML({ HTMLAttributes }) {
      return [
        'mark',
        mergeAttributes(HTMLAttributes, {
          class: `ai-${name}`,
          style: `background: ${color}; ${extraCSS}`,
        }),
        0,
      ]
    },
  })
}

export const AiInsert = createAiMark('ai_insert', 'var(--ai-insert-bg)', 'color: var(--foreground);')
export const AiDelete = createAiMark('ai_delete', 'var(--ai-delete-bg)', 'text-decoration: line-through; color: var(--foreground);')
export const AiComment = createAiMark('ai_comment', 'var(--ai-comment-bg)', 'color: var(--foreground);')
