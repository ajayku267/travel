import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const username = credentials.username as string;
        const password = credentials.password as string;

        // 1. Try to find Admin
        const adminUser = await db.adminUser.findUnique({
          where: { username },
        });

        if (adminUser) {
          const isValid = await bcrypt.compare(password, adminUser.password);
          if (isValid) {
            return {
              id: adminUser.id,
              name: adminUser.username,
              role: "admin",
            };
          }
        }

        // 2. Try to find Driver (where username is their phone number)
        const driverUser = await db.driver.findUnique({
          where: { phone: username },
        });

        if (driverUser && driverUser.activeStatus) {
          const isValid = await bcrypt.compare(password, driverUser.password);
          if (isValid) {
            return {
              id: driverUser.id,
              name: driverUser.name,
              role: "driver",
            };
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
