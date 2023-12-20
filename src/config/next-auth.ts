import { env } from "@/env.mjs"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { DefaultUser, type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import clientPromise from "@/lib/mongo/next-auth-adapter"

type User = DefaultUser & {
  isAccountConfirmed: boolean
  sub: string
  attendedQuizs: Array<Record<string, string>>
}

declare module "next-auth" {
  interface Session {
    user: User
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
  secret: env.NEXTAUTH_SECRET,
}
