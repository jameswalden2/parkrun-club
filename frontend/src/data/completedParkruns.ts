"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { CompletedParkrunType } from "@/types/CompletedParkrunsTypes";

export const completedParkruns = async (): Promise<
    Array<CompletedParkrunType>
> => {
    const user = await currentUser();

    const whereClause = false ? {} : { userId: Number(user.id) };

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

    return completedParkruns;
};
