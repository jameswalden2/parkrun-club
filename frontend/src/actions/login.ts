"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@baseauth";
import { LoginSchema } from "@/schemas";
import { getUserByUsername } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        console.log("invalid fields");
        return { error: "Invalid fields!" };
    }

    const { username, password } = validatedFields.data;

    const existingUser = await getUserByUsername(username);

    if (!existingUser || !existingUser.username || !existingUser.password) {
        console.log("username doesn't exist");
        return { error: "Username does not exist!" };
    }

    try {
        await signIn("credentials", {
            username,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error;
    }
};
