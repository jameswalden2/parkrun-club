"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { ParkrunClubMembershipType } from "@/types/ParkrunClubTypes";

export const memberships = async (): Promise<
    Array<ParkrunClubMembershipType>
> => {
    const user = await currentUser();

    if (!user) {
        throw new Error("Not authorised.");
    }

    const memberships = await db.parkrunClubMembership.findMany({
        where: { userId: Number(user.id) },
        select: {
            userId: true,
            createdAt: true,
            parkrunClub: {
                select: {
                    id: true,
                    name: true,
                    uniqueCode: true,
                    owner: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });

    return memberships;
};
