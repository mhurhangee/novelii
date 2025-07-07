import { Editor } from '@/components/editor'

export default function Page() {
  return (
    <main className="mx-auto flex h-screen w-screen max-w-2xl flex-col font-sans">
      <h1 className="mb-4 text-center text-3xl font-bold">NeuEditor</h1>
      <Editor />
    </main>
  )
}
