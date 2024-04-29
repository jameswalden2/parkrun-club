var bcrypt = require("bcryptjs");
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";

import { LoginSchema } from "@/schemas";
import { getUserByUsername } from "@/data/user";
import { User } from "@prisma/client";

export default {
    providers: [
        // Google({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
        Credentials({
            name: "Credentials",
            async authorize(credentials, req) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { username, password } = validatedFields.data;

                    const user = (await getUserByUsername(username)) as User;
                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
