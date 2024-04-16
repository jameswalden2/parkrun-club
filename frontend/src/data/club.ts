import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";

type GetClubByNameInputType = {
    name: string;
    userId: number;
};

export const getClubsForActiveUser = async () => {
    const user = await currentUser();
    if (!user) {
        return [];
    }
    const userId = Number(user.id);

    try {
        const parkrunClubs = await db.parkrunClubMembership.findMany({
            where: {
                userId,
            },
            select: {
                parkrunClub: {
                    select: {
                        name: true,
                        id: true,
                        uniqueCode: true,
                    },
                },
            },
        });

        return parkrunClubs;
    } catch (error) {
        throw error;
    }
};

export const getClubByName = async ({
    name,
    userId,
}: GetClubByNameInputType) => {
    try {
        const parkrunClub = await db.parkrunClub.findFirst({
            where: { name, userId },
        });

        if (parkrunClub) {
            console.log("ParkrunClub found:", parkrunClub);
            return parkrunClub;
        }
        console.log("No ParkrunClub found matching the criteria.");
        return null;
    } catch (error) {
        console.log({ error });
        return null;
    }
};

type GetClubByUniqueCodeInputType = {
    uniqueCode: string;
    selectStatement?: object;
};

export const getClubByUniqueCode = async ({
    uniqueCode,
}: GetClubByUniqueCodeInputType): Promise<ParkrunClubType> => {
    try {
        const parkrunClub = await db.parkrunClub.findUnique({
            select: {
                id: true,
                name: true,
                uniqueCode: true,
            },
            where: { uniqueCode },
        });

        if (parkrunClub) {
            console.log("ParkrunClub found:", parkrunClub);
            return parkrunClub;
        }
        console.log("No ParkrunClub found matching the criteria.");
        return null;
    } catch (error) {
        console.log({ error });
        return null;
    }
};

export async function generateUniqueCode(length: number = 8): Promise<string> {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uniqueCode = "";

    for (let i = 0; i < length; i++) {
        uniqueCode += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    // Check if the generated code exists in the database
    const codeExists = await db.parkrunClub.findUnique({
        where: {
            uniqueCode,
        },
    });

    // If the code exists, recursively call the function until a unique code is generated
    if (codeExists) {
        return generateUniqueCode(length); // Recursive call
    } else {
        return uniqueCode; // Return the unique code
    }
}
