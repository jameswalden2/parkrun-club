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
    const newLeaderboardData = await db.parkrunClubMembership.findMany({
        where: {
            parkrunClubId,
        },
        select: {
            user: {
                select: {
                    name: true,
                    completedParkruns: {
                        select: {
                            parkrunId: true,
                        },
                    },
                },
            },
        },
    });

    let mappedLeaderboardData = newLeaderboardData.map((membership) => {
        const uniqueParkrunIds = new Set(
            membership.user.completedParkruns.map((cp) => cp.parkrunId)
        );
        return {
            name: membership.user.name,
            completedParkruns: uniqueParkrunIds.size,
        };
    });

    mappedLeaderboardData = mappedLeaderboardData.sort(
        (a, b) => b.completedParkruns - a.completedParkruns
    );

    return mappedLeaderboardData;
};
