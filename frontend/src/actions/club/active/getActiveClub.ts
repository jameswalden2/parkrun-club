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

    try {
        const usersActiveClub = await db.user.findUnique({
            where: {
                id: user.id,
            },
            select: {
                activeParkrunClub: true,
            },
        });

        if (!usersActiveClub || !usersActiveClub.activeParkrunClub) {
            return {
                success: false,
                parkrunClub: null,
                code: "no_active_club",
            };
        }

        const parkrunClub = usersActiveClub.activeParkrunClub;

        return { parkrunClub: parkrunClub, success: true, code: "success" };
    } catch (error) {
        return { parkrunClub: null, success: false, code: String(error) };
    }
};
