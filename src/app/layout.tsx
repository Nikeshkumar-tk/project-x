import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import { getServerSession } from "next-auth"

import { authOptions } from "@/config/next-auth"
import { NextThemeProvider, SessionProvider } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Project X",
  description:
    "Project X is a starter template for Next.js with Tailwind CSS and TypeScript.",
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
