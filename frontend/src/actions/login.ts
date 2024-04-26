"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@baseauth";
import { LoginSchema } from "@/schemas";
import { getUserByUsername } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export type LoginResult = {
    success: boolean;
    code: string;
};

export const login = async (
    values: z.infer<typeof LoginSchema>
): Promise<LoginResult> => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, code: "invalid_fields" };
    }

    const { username, password } = validatedFields.data;

    const existingUser = await getUserByUsername(username);

    if (!existingUser || !existingUser.username || !existingUser.password) {
        return { success: false, code: "username_error" };
    }

    try {
        await signIn("credentials", {
            username,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
        return { success: true, code: "success" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { success: false, code: "credentials_error" };
                default:
                    return { success: false, code: "unknown_error" };
            }
        }

        throw error;
    }
};
