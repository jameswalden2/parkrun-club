"use server";

import { db } from "@/lib/prisma";

import { currentUser } from "@/lib/auth";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";

export type DeleteClubResultType = {
    success: boolean;
};

export const deleteClub = async (
    parkrunClub: ParkrunClubType
): Promise<DeleteClubResultType> => {
    const user = await currentUser();
    if (!user) {
        throw new Error("User not logged in!");
    }

    try {
        await db.parkrunClub.delete({
            where: {
                id: parkrunClub.id,
            },
        });
        return { success: true };
    } catch (error) {
        throw error;
    }
};
