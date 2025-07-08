import { Extension } from '@tiptap/react'

export const CopilotTrigger = Extension.create({
  name: 'copilotTrigger',
  addKeyboardShortcuts() {
    return {
      'Mod-Space': () => {
        // We'll handle the API trigger via a callback passed from React (see below)
        if (this.options.onTrigger) {
          this.options.onTrigger()
        }
        return true
      },
    }
  },
})
