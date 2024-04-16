"use server";

import { getLeaderboardData } from "@/data/parkrun";

export const testFunc = async () => {
    const leaderboardData = await getLeaderboardData();

    return leaderboardData;
};
