"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { CompletedParkrunType } from "@/types/CompletedParkrunsTypes";

export const completedParkruns = async (
    isClubSelected: boolean,
    parkrunClubId: number | undefined = undefined
): Promise<Array<CompletedParkrunType>> => {
    const user = await currentUser();

    if (!user) {
        throw new Error("unauthenticated.");
    }

    const whereClause =
        parkrunClubId && isClubSelected
            ? {
                  user: {
                      memberships: {
                          some: {
                              parkrunClubId: parkrunClubId,
                          },
                      },
                  },
              }
            : { userId: Number(user.id) };

    const completedParkruns = await db.completedParkrun.findMany({
        where: whereClause,
        select: {
            id: true,
            parkrunId: true,
            userId: true,
            noOfCompletions: true,
            parkrun: {
                select: {
                    name: true,
                },
            },
        },
    });

    const sortedCompletedParkruns = completedParkruns.sort((a, b) => {
        if (b.noOfCompletions == a.noOfCompletions) {
            const upperA = a.parkrun.name.toUpperCase();
            const upperB = b.parkrun.name.toUpperCase();
            return upperA < upperB ? -1 : upperA > upperB ? 1 : 0;
        }
        return b.noOfCompletions - a.noOfCompletions;
    });

    const filteredCompletedParkruns = sortedCompletedParkruns.filter(
        (value, index, self) =>
            index ===
            self.findIndex((t) => t.parkrun.name === value.parkrun.name)
    );

    return filteredCompletedParkruns;
};
