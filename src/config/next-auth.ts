import { DefaultUser, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongo/next-auth-adapter";

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
    // Configure one or more authentication providers
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}