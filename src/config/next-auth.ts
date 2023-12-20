import { env } from "@/env.mjs"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { DefaultUser, type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";

import clientPromise from "@/lib/mongo/next-auth-adapter"
import { APP_ROLES } from "./auth";

type User = DefaultUser & {
  role: keyof typeof APP_ROLES
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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        if (user) {
          return user
        } else {
          return null
        }
      }
    })
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
