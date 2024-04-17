"use server";

import * as z from "zod";

import { db } from "@/lib/prisma";
import { SettingsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { UserSettingsType } from "@/types/UserTypes";

export type GetSettingsResultType = {
    success: boolean;
    settings: UserSettingsType | null;
    code: string;
};

export const getSettings = async (): Promise<GetSettingsResultType> => {
    const user = await currentUser();

    if (!user || !user.id) {
        return { success: false, settings: null, code: "unauthorized" };
    }

    try {
        const userSettings = await db.userSettings.findUnique({
            where: { userId: Number(user.id) },
            select: {
                theme: true,
            },
        });

        return { success: true, settings: userSettings, code: "success" };
    } catch (error) {
        throw error;
    }
};
