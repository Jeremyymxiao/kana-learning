import { DefaultSession, DefaultUser } from "next-auth"
import { UserRole } from "@/types/user"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
      username: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    name?: string | null
    username: string
    role: UserRole
    image?: string | null
    emailVerified?: Date | null
    googleId?: string | null
    passwordHash?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole
    username?: string
  }
}