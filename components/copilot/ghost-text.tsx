import { Extension } from '@tiptap/react'

import { EditorState, Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

interface GhostTextOptions {
  ghostText: string
  from: number // position where to show
  loading: boolean
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    aiGhostText: {
      setGhostText: (ghostText: string, from: number, loading: boolean) => ReturnType
      clearGhostText: () => ReturnType
    }
  }
}

export const AIGhostText = Extension.create<GhostTextOptions>({
  name: 'aiGhostText',
  addOptions() {
    return {
      ghostText: '',
      from: 0,
      loading: false,
    }
  },

  addCommands() {
    return {
      setGhostText: (ghostText: string, from: number, loading: boolean) => () => {
        this.options.ghostText = ghostText
        this.options.from = from
        this.options.loading = loading
        return true
      },
      clearGhostText: () => () => {
        this.options.ghostText = ''
        this.options.loading = false
        return true
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('aiGhostText'),
        props: {
          decorations: (state: EditorState) => {
            const { ghostText, from, loading } = this.options
            if ((!ghostText && !loading) || !from) return null
            return DecorationSet.create(state.doc, [
              Decoration.widget(from, () => {
                const span = document.createElement('span')
                span.textContent = ghostText
                span.style.opacity = '0.4'
                span.style.pointerEvents = 'none'
                span.style.userSelect = 'none'
                span.style.fontStyle = 'italic'
                span.className = 'ai-ghost-text'

                if (loading) {
                  const loader = document.createElement('span')
                  loader.innerHTML = `
                    <svg class="inline animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#888" stroke-width="4"/>
                      <path class="opacity-75" fill="#888" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>  
                  `
                  loader.style.display = 'inline-flex'
                  loader.style.alignItems = 'center'
                  span.appendChild(loader)
                  return span
                } else {
                  // Extra hint
                  const hint = document.createElement('span')
                  hint.textContent = '(Tab to accept)'
                  hint.style.opacity = '0.6'
                  hint.style.fontSize = '0.9em'
                  hint.style.marginLeft = '4px'
                  hint.style.color = '#888'
                  hint.className = 'ai-ghost-text-hint'
                  span.appendChild(hint)
                }

                return span
              }),
            ])
          },
        },
      }),
    ]
  },
})
