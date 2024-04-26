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
    const user = await currentUser();
    if (!user) {
        throw new Error("Not authorised.");
    }

    const userId = user.id;
    if (!userId) {
        throw new Error("No userId available.");
    }

    const parkrunClub = await getClubByUniqueCode({
        uniqueCode,
    });

    if (!parkrunClub) {
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
