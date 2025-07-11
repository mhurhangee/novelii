import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/ui/theme-provider'

import { appConfig } from '@/lib/config/app'
import { fontMono, fontSans } from '@/lib/config/fonts'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: process.env.NODE_ENV === 'development' ? `${appConfig.name} (dev)` : appConfig.name,
  description: appConfig.description,
  icons: {
    icon: [
      {
        url: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${appConfig.emojiFavicon}</text></svg>`,
      },
    ],
    shortcut: [
      {
        url: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${appConfig.emojiFavicon}</text></svg>`,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
