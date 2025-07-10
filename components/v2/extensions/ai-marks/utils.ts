// ai-mark-utils.ts
import type { Editor } from '@tiptap/react'

const AI_MARKS = ['ai_insert', 'ai_delete', 'ai_comment']

/**
 * Get active AI mark at selection or cursor (returns mark name or null)
*/
export function getActiveAiMark(editor: Editor): string | null {
    const { from, to, empty } = editor.state.selection
    for (const mark of AI_MARKS) {
        if (!empty) {
            if (editor.state.doc.rangeHasMark(from, to, editor.schema.marks[mark])) {
                return mark
            }
        } else {
            if (editor.isActive(mark)) {
                return mark
            }
        }
    }
    return null
}

/**
 * Remove active AI mark at selection or cursor (leave text)
 */
export function clearActiveAiMark(editor: Editor) {
    const mark = getActiveAiMark(editor)
    if (!mark) return

    const { empty } = editor.state.selection
    if (empty) {
        // Expand to full mark at cursor
        editor.chain().extendMarkRange(mark).unsetMark(mark).run()
    } else {
        // Remove mark from selection (may be full or partial)
        editor.chain().extendMarkRange(mark).unsetMark(mark).run()
    }
}

/**
 * Delete marked text if selection/cursor is within AI mark
 */
export function deleteActiveAiMarkedText(editor: Editor) {
    const mark = getActiveAiMark(editor)
    if (!mark) return

    // Expand to mark, then delete
    editor.chain().extendMarkRange(mark).deleteSelection().run()
}

/**
 * Get metadata of active AI mark at selection or cursor (returns mark attributes or null)
 */
export function getAiMarkMetadata(editor: Editor) {
    const { from, to } = editor.state.selection
    let found = null
  
    editor.state.doc.nodesBetween(from, to, (node) => {
      node.marks.forEach(mark => {
        if (AI_MARKS.includes(mark.type.name)) {
          found = mark.attrs
        }
      })
    })
  
    return found // e.g., { reason: "AI grammar improvement." }
}

export function isInAiMark(editor: Editor): boolean {
    const { from, to, empty } = editor.state.selection
    return (
      (empty && (
        editor.isActive('ai_insert') ||
        editor.isActive('ai_delete') ||
        editor.isActive('ai_comment')
      )) ||
      (!empty && (
        editor.state.doc.rangeHasMark(from, to, editor.schema.marks.ai_insert) ||
        editor.state.doc.rangeHasMark(from, to, editor.schema.marks.ai_delete) ||
        editor.state.doc.rangeHasMark(from, to, editor.schema.marks.ai_comment)
      ))
    ) || false
  }
  
  export function isNormalSelection(editor: Editor): boolean {
    const { empty } = editor.state.selection
    return !empty && !isInAiMark(editor) || false
  }
  