import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { TooltipProvider } from "@/components/ui/tooltip"
import './globals.css'

const fontSans = Geist({
  variable: '--font-google-sans',
  subsets: ['latin'],
})

const fontMono = Geist_Mono({
  variable: '--font-google-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'NeuEditor',
  description: 'An editor for the future',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
