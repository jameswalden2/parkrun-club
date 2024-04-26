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

    const user = await currentUser();

    if (!user) {
        throw new Error("Not authorised.");
    }

    const ownerId = user.id;

    if (!ownerId) {
        throw new Error("No ownerId available.");
    }

    const existingClub = await getClubByName({ name, ownerId });

    if (existingClub) {
        throw Error("Club already exists!");
    }

    const uniqueCode = await generateUniqueCode();

    try {
        const newParkrunClub = await db.parkrunClub.create({
            data: {
                name: name,
                uniqueCode: uniqueCode,
                ownerId: ownerId,
            },
            select: {
                id: true,
                name: true,
                uniqueCode: true,
                ownerId: true,
            },
        });

        await db.parkrunClubMembership.create({
            data: {
                parkrunClubId: newParkrunClub.id,
                userId: ownerId,
            },
        });

        await db.user.update({
            where: {
                id: ownerId,
            },
            data: {
                activeParkrunClubId: newParkrunClub.id,
            },
        });

        return newParkrunClub;
    } catch (error) {
        throw error;
    }
};
