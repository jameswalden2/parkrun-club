"use server";

import { db } from "@/lib/prisma";

import { currentUser } from "@/lib/auth";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";
import { CompletedParkrunType } from "@/types/CompletedParkrunsTypes";

export type UpdateCompletedParkrunsResultType = {
    success: boolean;
    code: string;
};

export const updateCompletedParkruns = async (
    updatedCompletedParkrunMap: Map<String, CompletedParkrunType>
): Promise<UpdateCompletedParkrunsResultType> => {
    const user = await currentUser();
    if (!user) {
        throw new Error("User not logged in!");
    }

    try {
        updatedCompletedParkrunMap.forEach(async (value, key, originalMap) => {
            await db.completedParkrun.update({
                where: {
                    id: value.id,
                },
                data: {
                    noOfCompletions: value.noOfCompletions,
                },
            });
        });

        return { success: true, code: "success" };
    } catch (error) {
        throw error;
    }
};
