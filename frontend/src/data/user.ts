import { db } from "@/lib/prisma";
import { UserType } from "@/types/UserTypes";

export const getUserByUsername = async (username: string) => {
    try {
        const user = await db.user.findUnique({ where: { username } });
        return user;
    } catch (error) {
        return null;
    }
};

export const getUserById = async (id: string): Promise<UserType | null> => {
    try {
        const user = await db.user.findUnique({
            where: { id },
            select: {
                name: true,
                username: true,
                id: true,
            },
        });

        return user;
    } catch {
        return null;
    }
};
