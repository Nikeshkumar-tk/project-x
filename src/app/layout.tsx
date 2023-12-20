import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextThemeProvider, SessionProvider } from '@/components/providers'
import { authOptions } from '@/config/next-auth'
import { getServerSession } from 'next-auth'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Project X',
  description: 'Project X is a starter template for Next.js with Tailwind CSS and TypeScript.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <NextThemeProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
          </NextThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
