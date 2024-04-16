"use server";

import { getClubByUniqueCode } from "@/data/club";
import { db } from "@/lib/prisma";

import { currentUser } from "@/lib/auth";

export type JoinClubResultType = {
    success: boolean;
    code: string;
};

export const joinClub = async (
    uniqueCode: string
): Promise<JoinClubResultType> => {
    const userId = Number((await currentUser()).id);

    const parkrunClub = await getClubByUniqueCode({
        uniqueCode,
    });

    if (!parkrunClub) {
        console.log("No club exists already exists!");
        return {
            success: true,
            code: "no_club_found",
        };
    }

    try {
        await db.parkrunClubMembership.create({
            data: {
                parkrunClubId: parkrunClub.id,
                userId: userId,
            },
        });

        return {
            success: true,
            code: "successful",
        };
    } catch (error) {
        throw error;
    }
};
