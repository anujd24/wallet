import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import type { Session, User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
         id: "credentials", 
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.phone || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });

        if (existingUser) {
          const isValid = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (!isValid) return null;

          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.number,
          };
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const newUser = await db.user.create({
          data: {
            number: credentials.phone,
            password: hashedPassword,
          },
        });

        return {
          id: newUser.id.toString(),
          name: newUser.name,
          phone: newUser.number,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  pages: {
    signIn: "/login",   // Redirect to landing page instead of /api/auth/signin
    signOut: "/",  // Redirect here after logout
    error: "/",    // Optional: error redirect
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
};
