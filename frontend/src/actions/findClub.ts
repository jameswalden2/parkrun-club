"use server";

import * as z from "zod";

import { getClubByUniqueCode } from "@/data/club";
import { FindClubSchema } from "@/schemas";
import { db } from "@/lib/prisma";

import { currentUser } from "@/lib/auth";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";

export type FindParkrunClubResultType = {
    success: boolean;
    parkrunClub: ParkrunClubType | null;
    code: string;
};

export const findClub = async (
    values: z.infer<typeof FindClubSchema>
): Promise<FindParkrunClubResultType> => {
    const user = await currentUser();
    if (!user) {
        throw new Error("Not authorised.");
    }
    const validatedFields = FindClubSchema.safeParse(values);

    if (!validatedFields.success) {
        throw Error("Invalid fields!");
    }

    const { uniqueCode } = validatedFields.data;

    try {
        const parkrunClub = await getClubByUniqueCode({ uniqueCode });

        if (!parkrunClub) {
            return {
                success: false,
                parkrunClub: null,
                code: "no_club_exists",
            };
        }

        const existingMembership = await db.parkrunClubMembership.findFirst({
            where: {
                parkrunClubId: parkrunClub.id,
                userId: user.id,
            },
        });

        if (existingMembership) {
            return {
                success: false,
                parkrunClub: parkrunClub,
                code: "membership_exists",
            };
        }

        return {
            success: true,
            parkrunClub: parkrunClub,
            code: "success",
        };
    } catch (error) {
        throw error;
    }
};
