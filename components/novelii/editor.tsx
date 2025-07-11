'use client'

import TableOfContents from '@tiptap/extension-table-of-contents'
import { getHierarchicalIndexes } from '@tiptap/extension-table-of-contents'
import { useEditor } from '@tiptap/react'
import { Editor as TiptapEditor } from '@tiptap/react'

import { useRef, useState } from 'react'

import { initialContent } from '@/lib/config/initial-content'

import { extensions } from './extensions'
import { AiComment, AiDelete, AiInsert } from './extensions/ai-marks'
import { AIGhostText } from './extensions/ghost-text'
import { makeGhostKeydownHandler } from './extensions/ghost-text/utils'
import { getGhostText } from './extensions/ghost-text/utils'
import { InlineAISuggestion } from './extensions/inline-ai-suggestion'
import { fetchSuggestion } from './extensions/inline-ai-suggestion/utils'
import { SlashMenu } from './extensions/slash-commands'
import { SplitView } from './split-view'

export const Editor = () => {
  const editorRef = useRef<TiptapEditor | null>(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const [menuQuery, setMenuQuery] = useState('')
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })
  const [menuRange, setMenuRange] = useState({ from: 0, to: 0 })
  const [menuSelected, setMenuSelected] = useState(0)

  // For menu filtering
  const COMMANDS = SlashMenu.COMMANDS

  // This function recalculates menu open/query/position etc.
  function onUpdate() {
    if (!editorRef.current) return
    const editor = editorRef.current
    const { from } = editor.state.selection
    const textBefore = editor.state.doc.textBetween(Math.max(0, from - 50), from, '\n', '\0')
    const slashIndex = textBefore.lastIndexOf('/')
    if (slashIndex === -1) {
      setMenuOpen(false)
      return
    }
    const query = textBefore.slice(slashIndex + 1)

    // Dismiss if query contains any space (after the slash)
    if (query.includes(' ')) {
      setMenuOpen(false)
      return
    }
    // Open if just "/" or if filtering by query
    const coords = editor.view.coordsAtPos(from - query.length - 1)
    setMenuOpen(true)
    setMenuQuery(query)
    setMenuPos({ top: coords.bottom + window.scrollY, left: coords.left + window.scrollX })
    setMenuRange({ from: from - query.length - 1, to: from })
    setMenuSelected(0)
  }

  const editor = useEditor({
    extensions: [
      ...extensions,
      InlineAISuggestion.configure({
        onTrigger: () => editorRef.current && fetchSuggestion(editorRef.current),
      }),
      AIGhostText,
      AiInsert,
      AiDelete,
      AiComment,
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
      }),
    ],
    onCreate({ editor }) {
      editorRef.current = editor
    },

    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
      handleDOMEvents: {
        keydown: makeGhostKeydownHandler(editorRef, () => getGhostText(editorRef.current)),
      },
      handleKeyDown: (view, event) => {
        // Only handle when menu is open
        if (!menuOpen) return false
        // Get filtered list each keypress to match UI
        const filtered = COMMANDS.filter(item =>
          item.title.toLowerCase().includes(menuQuery.toLowerCase())
        )
        if (!filtered.length) return false

        if (event.key === 'ArrowDown') {
          setMenuSelected(s => (s + 1) % filtered.length)
          return true
        }
        if (event.key === 'ArrowUp') {
          setMenuSelected(s => (s - 1 + filtered.length) % filtered.length)
          return true
        }
        if (event.key === 'Enter') {
          filtered[menuSelected].command(editorRef.current!, menuRange)
          setMenuOpen(false)
          return true
        }
        if (event.key === 'Escape') {
          setMenuOpen(false)
          return true
        }
        if (event.key === ' ') {
          setMenuOpen(false)
          return false // let space through to the editor
        }
        // Let all other keys through (typing for filter)
        return false
      },
    },
  })

  // Connect Tiptap updates
  if (editor) {
    editor.on('update', onUpdate)
    editor.on('selectionUpdate', onUpdate)
  }

  if (!editor) return null
  return (
    <>
      <SplitView editor={editor} />
      <SlashMenu
        open={menuOpen}
        position={menuPos}
        query={menuQuery}
        onClose={() => setMenuOpen(false)}
        editor={editor}
        range={menuRange}
        selected={menuSelected}
        setSelected={setMenuSelected}
      />
    </>
  )
}
