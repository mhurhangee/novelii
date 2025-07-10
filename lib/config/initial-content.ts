export const initialContent = `
<h1>Novelii</h1>

<p>An AI writing assistant and <a href="https://tiptap.dev/">TipTap editor</a> inspired by <a href="https://github.com/steven-tey/novel">Novel</a>.</p>

<p><em>Please note that this is a work in progress and is not ready for production.</em></p>

<h2>AI Features</h2>

<ul>
<li>Auto-suggestions (Ctrl/Cmd + Space, then Tab to accept)</li>
<li>Modify or generate text in the document (bubble menu on text selection)</li>
<li>AI insertions and deletions as tracked changes (click on a marked up text to accept or reject)</li>
<li>Assistant to chat about document (assistant chat UI)</li>
</ul>

<h3>Roadmap</h3>

<ul>
<li>Agentic features to edit document from assistant chat UI</li>
<li>AI configuration settings, like style, tone, document type, etc.</li>
</ul>

<h2>Tech Stack</h2>

<ul>
<li><a href="https://nextjs.org/">Next.js</a></li>
<li><a href="https://tiptap.dev/">TipTap</a></li>
<li><a href="https://ai-sdk.dev/">AI SDK</a></li>
<li><a href="https://ui.shadcn.com/">Shadcn UI</a></li>
</ul>

<h2>Installation</h2>

<ol>
<li>Clone the repository</li>
<li>Install dependencies <code>pnpm i</code></li>
<li>Configure AI SDK models in <code>config/ai/models.ts</code> and add API key to <code>.env.local</code>. For more information on how to configure models see <a href="https://ai-sdk.dev/docs/foundations/providers-and-models">AISDK docs</a></li>
<li>Run the development server <code>pnpm dev</code></li>
</ol>

<h2>License</h2>

<p>MIT</p>
`
