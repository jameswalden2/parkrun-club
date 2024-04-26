import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";

import { db } from "@/lib/prisma";
import authConfig from "./auth.config";
import { getUserById } from "@/data/user";
import { UserType } from "@/types/UserTypes";

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
    adapter: PrismaAdapter(db) as Adapter,
    callbacks: {
        async signIn({ user, account }) {
            return true;
        },
        async session({ token, user, session }) {
            if (token.user) {
                const tokenUser: UserType = token.user;
                session.user.name = tokenUser.name;
                if (tokenUser.id) {
                    session.user.id = tokenUser.id;
                }

                if (tokenUser.username) {
                    session.user.username = tokenUser.username;
                }
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
    session: { strategy: "jwt" },
    ...authConfig,
});
