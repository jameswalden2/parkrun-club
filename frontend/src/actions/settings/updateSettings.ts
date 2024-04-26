"use server";

import * as z from "zod";

import { db } from "@/lib/prisma";
import { SettingsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { UserSettingsType } from "@/types/UserTypes";

export type UpdateSettingsResultType = {
    success: boolean;
    settings: UserSettingsType | null;
    code: string;
};

export const updateSettings = async (
    values: z.infer<typeof SettingsSchema>
): Promise<UpdateSettingsResultType> => {
    const user = await currentUser();

    if (!user || !user.id) {
        return { success: false, settings: null, code: "unauthorized" };
    }

    try {
        const updatedSettings = await db.userSettings.update({
            where: { userId: user.id },
            data: {
                ...values,
            },
        });

        return { success: true, settings: updatedSettings, code: "success" };
    } catch (error) {
        throw error;
    }
};
