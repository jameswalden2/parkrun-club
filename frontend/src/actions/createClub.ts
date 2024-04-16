"use server";

import * as z from "zod";

import { getClubByName } from "@/data/club";
import { NewClubSchema } from "@/schemas";
import { db } from "@/lib/prisma";

import { generateUniqueCode } from "@/data/club";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";
import { currentUser } from "@/lib/auth";

export const createClub = async (
    values: z.infer<typeof NewClubSchema>
): Promise<ParkrunClubType> => {
    const validatedFields = NewClubSchema.safeParse(values);

    if (!validatedFields.success) {
        console.log("invalid fields");
        throw Error("Invalid fields!");
    }

    const { name } = validatedFields.data;

    const userId = Number((await currentUser()).id);

    const existingClub = await getClubByName({ name, userId });

    if (existingClub) {
        console.log("club already exists");
        throw Error("Club already exists!");
    }

    const uniqueCode = await generateUniqueCode();

    try {
        const newParkrunClub = await db.parkrunClub.create({
            data: {
                name: name,
                uniqueCode: uniqueCode,
                userId: userId,
            },
            select: {
                id: true,
                name: true,
                uniqueCode: true,
            },
        });

        await db.parkrunClubMembership.create({
            data: {
                parkrunClubId: newParkrunClub.id,
                userId: userId,
            },
        });

        return newParkrunClub;
    } catch (error) {
        throw error;
    }
};
