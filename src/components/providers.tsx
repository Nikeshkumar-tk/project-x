"use client"

import { authOptions } from "@/config/next-auth";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export async function NextAuthSessionProvider({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions)
    return <SessionProvider session={session}>
        {children}
    </SessionProvider>
}