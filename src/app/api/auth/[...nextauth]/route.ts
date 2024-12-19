import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { UserRole } from "@/types/user"
import connectDB from "@/lib/mongodb"
import User from "@/models/user"

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        console.log("Google profile:", profile);
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          username: profile.name,
          role: UserRole.FREE
        }
      }
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, request) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error("Missing credentials");
            throw new Error("Email and password are required")
          }

          await connectDB();
          console.log("MongoDB connected successfully");

          const user = await User.findOne({ email: credentials.email });
          console.log("User found:", user ? "Yes" : "No");

          if (!user || !user.passwordHash) {
            console.error("Invalid credentials");
            throw new Error("Invalid email or password")
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          )

          if (!isPasswordValid) {
            console.error("Invalid password");
            throw new Error("Invalid email or password")
          }

          console.log("Authentication successful");
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            role: user.role,
            name: user.username
          }
        } catch (error) {
          console.error("Authorization error:", error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          console.log("JWT callback - user:", user);
          token.role = user.role;
          token.username = user.username;
        }
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        throw error;
      }
    },
    async session({ session, token }) {
      try {
        if (session.user) {
          console.log("Session callback - token:", token);
          session.user.id = token.sub as string;
          session.user.role = token.role as UserRole;
          session.user.username = token.username as string;
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        throw error;
      }
    },
    async signIn({ user, account, profile }) {
      try {
        console.log("SignIn callback - provider:", account?.provider);
        if (account?.provider === "google") {
          if (!user.email) {
            console.error("No email provided by Google");
            return false;
          }

          try {
            await connectDB();
            console.log("MongoDB connected successfully in signIn");
            
            const existingUser = await User.findOne({ email: user.email });
            console.log("Existing user found:", existingUser ? "Yes" : "No");

            if (!existingUser) {
              const newUser = await User.create({
                email: user.email,
                username: profile?.name || user.email.split("@")[0],
                googleId: user.id,
                image: user.image,
                emailVerified: new Date(),
                role: UserRole.FREE
              });
              console.log("New user created:", newUser._id);
            } else if (!existingUser.googleId) {
              await User.updateOne(
                { email: user.email },
                {
                  googleId: user.id,
                  image: user.image || existingUser.image,
                  emailVerified: existingUser.emailVerified || new Date()
                }
              );
              console.log("Existing user updated with Google ID");
            }
            return true;
          } catch (error) {
            console.error("Error in Google sign in:", error);
            return false;
          }
        }
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" }
} satisfies NextAuthConfig

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authConfig)