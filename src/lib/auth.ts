import { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { BaseURL } from "@/config";
import { DefaultJWT } from "next-auth/jwt";
import { UserResponse } from "@/feat/profile/dto";

declare module "next-auth" {
  interface User extends UserResponse {
    rememberMe: boolean;
  }
  interface Session extends DefaultSession {
    user: UserResponse & {
      expiresAt?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user?: UserResponse;
    expiresAt?: number;
  }
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        rememberMe: {},
      },
      async authorize(credentials) {
        const response = await fetch(`${BaseURL}/api/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        return { ...data, rememberMe: credentials?.rememberMe === "true" };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);

      if (user) {
        const { id, email, ...rest } = user;
        token.user = { id: Number(id), email: email ?? "", ...rest };

        token.expiresAt = user.rememberMe
          ? now + 24 * 60 * 60
          : now + 12 * 60 * 60;
      }

      if (now > (token.expiresAt ?? 0)) {
        return {};
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...token.user,
          expiresAt: token.expiresAt
            ? new Date(token.expiresAt * 1000).toISOString()
            : null,
        };
      }
      return session;
    },
  },
} satisfies NextAuthOptions;

export { authOptions };
