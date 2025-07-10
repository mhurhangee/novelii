import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Superscript from "@tiptap/extension-superscript"
import Subscript from "@tiptap/extension-subscript"
import { Markdown } from "tiptap-markdown"



export const extensions = [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Underline,
    Link,
    Superscript,
    Subscript,
    Markdown
]