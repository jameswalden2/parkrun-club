"use server";

import * as z from "zod";

import { db } from "@/lib/prisma";
import { SettingsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";

export type UpdateSettingsResultType = {
    success: boolean;
    code: string;
};

export const updateSettings = async (
    values: z.infer<typeof SettingsSchema>
): Promise<UpdateSettingsResultType> => {
    const user = await currentUser();

    if (!user || !user.id) {
        return { success: false, code: "unauthorized" };
    }

    try {
        await db.userSettings.update({
            where: { userId: Number(user.id) },
            data: {
                ...values,
            },
        });

        return { success: true, code: "success" };
    } catch (error) {
        throw error;
    }
};
