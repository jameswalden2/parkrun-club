"use server";

import { db } from "@/lib/prisma";

import { currentUser } from "@/lib/auth";

export type LeaveClubResultType = {
    success: boolean;
};

export const leaveClub = async (
    parkrunClubMembershipId: number
): Promise<LeaveClubResultType> => {
    const user = await currentUser();
    if (!user) {
        throw new Error("User not logged in!");
    }

    try {
        await db.parkrunClubMembership.delete({
            where: {
                id: parkrunClubMembershipId,
            },
        });
        return { success: true };
    } catch (error) {
        throw error;
    }
};
