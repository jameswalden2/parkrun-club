"use server";

import { db } from "@/lib/prisma";

import { currentUser } from "@/lib/auth";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";

export type SetActiveClubResultType = {
    success: boolean;
};

export const setActiveClub = async (
    newActiveParkrunClub: ParkrunClubType
): Promise<SetActiveClubResultType> => {
    const user = await currentUser();
    if (!user) {
        throw new Error("User not logged in!");
    }
    const id = Number(user.id);

    const activeParkrunClubId = newActiveParkrunClub.id;

    try {
        await db.user.update({
            where: {
                id,
            },
            data: {
                activeParkrunClubId,
            },
        });
        return { success: true };
    } catch (error) {
        throw error;
    }
};
