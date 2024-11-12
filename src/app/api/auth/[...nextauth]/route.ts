import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { JWT } from "next-auth/jwt"
import clientPromise from "@/lib/mongodb"
import { compare } from "bcrypt"
//import { authOptions } from "@/lib/auth"
//import type { Session } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      email?: string | null
      name?: string | null
      image?: string | null
    }
  }
}

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const client = await clientPromise
        const usersCollection = client.db("kana-learning").collection("users")
        
        const user = await usersCollection.findOne({ email: credentials.email })
        
        if (!user || !user.password) {
          throw new Error("No user found")
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error("Invalid password")
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }