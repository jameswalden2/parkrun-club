"use server";

import { db } from "@/lib/prisma";

import { currentUser } from "@/lib/auth";
import { CompletedParkrunType } from "@/types/CompletedParkrunsTypes";
import { completedParkruns } from "@/data/completedParkruns";

export type UpdateCompletedParkrunsResultType = {
    success: boolean;
    code: string;
    completedParkruns: Array<CompletedParkrunType>;
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

        const newCompletedParkruns = await completedParkruns(false);

        return {
            success: true,
            completedParkruns: newCompletedParkruns,
            code: "success",
        };
    } catch (error) {
        throw error;
    }
};
