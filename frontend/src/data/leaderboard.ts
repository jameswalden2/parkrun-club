"use server";

import { LeaderboardRowType } from "@/types/LeaderboardTypes";

import { db } from "@/lib/prisma";

type LeaderboardInput = {
    parkrunClubId: number | undefined;
};

export const leaderboard = async ({
    parkrunClubId,
}: LeaderboardInput): Promise<Array<LeaderboardRowType>> => {
    if (!parkrunClubId) {
        return [];
    }
    const leaderboardData = await db.parkrunClubMembership.findMany({
        where: {
            parkrunClubId,
        },
        select: {
            user: {
                select: {
                    id: true,
                    name: true,
                    _count: {
                        select: {
                            completedParkruns: true,
                        },
                    },
                },
            },
        },
    });

    const mappedLeaderboardData = leaderboardData.map((x) => {
        return x.user;
    });

    const sortedleaderboardData = mappedLeaderboardData.sort(
        (a, b) => b._count.completedParkruns - a._count.completedParkruns
    );

    return sortedleaderboardData;
};
