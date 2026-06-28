import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  providers: [], // Providers are added in auth.ts
} satisfies NextAuthConfig;
