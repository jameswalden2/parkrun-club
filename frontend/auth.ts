import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/prisma";
import authConfig from "./auth.config";
import { getUserById } from "@/data/user";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    unstable_update,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            return true;
        },
        async session({ token, user, session }) {
            if (token.user) {
                session.user.name = token.user.name;
                session.user.username = token.user.username;
                session.user.id = token.user.id;
            }

            if (token.sub && session.user) {
                session.user.subid = token.sub;
            }

            return session;
        },
        async jwt({ token, user, profile, account }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.user = existingUser;

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
