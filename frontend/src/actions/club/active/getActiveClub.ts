"use server";

import { db } from "@/lib/prisma";

import { currentUser } from "@/lib/auth";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";

export type GetActiveClubResultType = {
    success: boolean;
    parkrunClub: ParkrunClubType | null;
    code: string;
};

export const getActiveClub = async (): Promise<GetActiveClubResultType> => {
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

        if (!user || !user.activeParkrunClub) {
            return {
                success: false,
                parkrunClub: null,
                code: "no_active_club",
            };
        }

        const parkrunClub = user.activeParkrunClub;

        return { parkrunClub: parkrunClub, success: true, code: "success" };
    } catch (error) {
        throw error;
    }
};
