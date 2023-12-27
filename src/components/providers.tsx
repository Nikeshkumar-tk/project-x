"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider, useTheme } from "next-themes"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "sonner"

export function NextThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}

//React Query Provider
const queryClient = new QueryClient()

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export function ToastProvider() {
  const theme = useTheme()
  return <Toaster theme={theme.theme as "dark" | "light" | "system"} />
}

export { SessionProvider }
