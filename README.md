# Novelii

An AI writing assistant and [TipTap editor](https://tiptap.dev/) inspired by [Novel](https://github.com/steven-tey/novel).

**Please note that this is a work in progress and is not ready for production.**

## AI Features

- Auto-suggestions (Ctrl/Cmd + Space, then Tab to accept)
- Modify or generate text in the document (bubble menu on text selection)
- AI insertions and deletions as tracked changes (click on a marked up text to accept or reject)
- Assistant to chat about document (assistant chat UI)

### Roadmap

- Agentic features to edit document from assistant chat UI
- AI configuration settings, like style, tone, document type, etc.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TipTap](https://tiptap.dev/)
- [AI SDK](https://ai-sdk.dev/)
- [Shadcn UI](https://ui.shadcn.com/)

## Installation

1.  Clone the repository
2.  Install dependencies `pnpm i`
3.  Configure AI SDK models in `config/ai/models.ts` and add API key to `.env.local`. For more information on how to configure models see [AISDK docs](https://ai-sdk.dev/docs/foundations/providers-and-models)
4.  Run the development server `pnpm dev`

## License

MIT
