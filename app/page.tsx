import { Editor } from '@/components/editor'

import { appConfig } from '@/lib/config/app'

export default function Page() {
  return (
    <main className="mx-auto flex h-screen w-screen max-w-2xl flex-col font-sans">
      <h1 className="mb-4 text-center text-3xl font-bold">{appConfig.name}</h1>
      <p className="text-muted-foreground text-center">{appConfig.description}</p>
      <Editor />
    </main>
  )
}
