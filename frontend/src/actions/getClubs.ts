"use server";

import { getClubsForActiveUser } from "@/data/club";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";

export const getClubs = async (): Promise<Array<ParkrunClubType>> => {
    const parkrunClubs = await getClubsForActiveUser();

    if (!parkrunClubs) {
        console.log("No clubs found!");
        return [];
    }

    const mappedParkruns = parkrunClubs.map((club) => club.parkrunClub);

    return mappedParkruns;
};
