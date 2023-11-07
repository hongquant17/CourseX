import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from '@next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToasterProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'

const robo = Roboto({
  weight: '400',
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
      <body className={robo.className}>
        <ConfettiProvider/>
        <ToasterProvider />
        {children}
      </body>
      </html>
    </ClerkProvider>
  )
}
