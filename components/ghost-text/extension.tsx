import { Extension } from "@tiptap/react";
import { Decoration, DecorationSet } from "prosemirror-view";
import { Plugin, EditorState } from "prosemirror-state";

export interface GhostTextOptions {
  ghostText: string;
  from: number; // position where to show
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    aiGhostText: {
      setGhostText: (ghostText: string, from: number) => ReturnType;
      clearGhostText: () => ReturnType;
    };
  }
}

export const AIGhostText = Extension.create<GhostTextOptions>({
  name: "aiGhostText",
  addOptions() {
    return {
      ghostText: "",
      from: 0,
    };
  },

  addCommands() {
    return {
      setGhostText:
        (ghostText: string, from: number) =>
          () => {
            this.options.ghostText = ghostText;
            this.options.from = from;
            return true;
          },
      clearGhostText:
        () =>
          () => {
            this.options.ghostText = "";
            return true;
          },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: (state: EditorState) => {
            const { ghostText, from } = this.options;
            if (!ghostText) return null;
            return DecorationSet.create(state.doc, [
              Decoration.widget(from, () => {
                const span = document.createElement("span");
                span.textContent = ghostText;
                span.style.opacity = "0.4";
                span.style.pointerEvents = "none";
                span.style.userSelect = "none";
                span.style.fontStyle = "italic";
                span.className = "ai-ghost-text";

                // Extra hint
                const hint = document.createElement("span");
                hint.textContent = "(Tab to accept)";
                hint.style.opacity = "0.6";
                hint.style.fontSize = "0.9em";
                hint.style.marginLeft = "4px";
                hint.style.color = "#888";
                hint.className = "ai-ghost-text-hint";
                span.appendChild(hint);

                return span;
              }),
            ]);
          },
        },
      }),
    ];
  },
});
