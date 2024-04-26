"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";

export type ClubsForActiveUserType = {
    parkrunClub: ParkrunClubType;
};

export const getClubsForActiveUser = async (): Promise<
    Array<ClubsForActiveUserType>
> => {
    const user = await currentUser();
    if (!user) {
        return [];
    }

    try {
        const parkrunClubs = await db.parkrunClubMembership.findMany({
            where: {
                userId: user.id,
            },
            select: {
                parkrunClub: true,
            },
        });

        return parkrunClubs;
    } catch (error) {
        throw error;
    }
};

export const myClubs = async (): Promise<Array<ParkrunClubType>> => {
    const user = await currentUser();

    if (!user) {
        throw new Error("Not authorised.");
    }

    const myClubs = await db.parkrunClub.findMany({
        where: { ownerId: user.id },
        select: {
            id: true,
            name: true,
            uniqueCode: true,
            ownerId: true,
            createdAt: true,
            _count: {
                select: {
                    memberships: true,
                },
            },
        },
    });

    return myClubs;
};

type GetClubByNameInputType = {
    name: string;
    ownerId: string | undefined;
};

export const getClubByName = async ({
    name,
    ownerId,
}: GetClubByNameInputType): Promise<ParkrunClubType | null> => {
    try {
        if (!ownerId) {
            return null;
        }
        const parkrunClub = await db.parkrunClub.findFirst({
            where: { name, ownerId },
        });

        if (!parkrunClub) {
            return null;
        }
        return parkrunClub;
    } catch (error) {
        return null;
    }
};

type GetClubByUniqueCodeInputType = {
    uniqueCode: string;
    selectStatement?: object;
};

export const getClubByUniqueCode = async ({
    uniqueCode,
}: GetClubByUniqueCodeInputType): Promise<ParkrunClubType | null> => {
    try {
        const parkrunClub = await db.parkrunClub.findUnique({
            where: { uniqueCode },
        });

        if (!parkrunClub) {
            return null;
        }
        return parkrunClub;
    } catch (error) {
        return null;
    }
};

export async function generateUniqueCode(length: number = 8): Promise<string> {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // add more characters if needed
    let uniqueCode = "";

    for (let i = 0; i < length; i++) {
        uniqueCode += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    // check if the generated code exists in the database
    const codeExists = await db.parkrunClub.findUnique({
        where: {
            uniqueCode,
        },
    });

    // if the code exists, recursively call the function until a unique code is generated
    if (codeExists) {
        return generateUniqueCode(length);
    } else {
        return uniqueCode;
    }
}
