"use server";

import { db } from "@/lib/prisma";

import { currentUser } from "@/lib/auth";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";

export type GetActiveClubResultType = {
    success: boolean;
    active: string;
};

export const getActiveClub = async (): Promise<ParkrunClubType> => {
    const user = await currentUser();
    if (!user) {
        throw new Error("User not logged in!");
    }
    const id = Number(user.id);

    try {
        const user = await db.user.findUnique({
            where: {
                id,
            },
            select: {
                activeParkrunClub: true,
            },
        });

        const parkrunClub = user?.activeParkrunClub;

        return parkrunClub;
    } catch (error) {
        throw error;
    }
};
