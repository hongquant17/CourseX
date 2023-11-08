import './globals.css'
import type { Metadata } from 'next'
import { Inter } from '@next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToasterProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'

const inter = Inter({
  subsets: ['vietnamese']
})

export const metadata: Metadata = {
  title: 'CourseX',
  // description: 'Learners and educators gather!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}>
        <ConfettiProvider/>
        <ToasterProvider />
        {children}
      </body>
      </html>
    </ClerkProvider>
  )
}
