"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas";
import { getUserByUsername } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { username, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByUsername(username);

    if (existingUser) {
        return { error: "Username already in use!" };
    }

    await db.user.create({
        data: {
            name,
            username,
            password: hashedPassword,
        },
    });

    return { success: "Success!" };
};
