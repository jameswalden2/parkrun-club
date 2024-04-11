import { db } from "@/lib/prisma";

export const getUserByUsername = async (username: string) => {
    try {
        const user = await db.user.findUnique({ where: { username } });

        return user;
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const intID = Number(id);
        const user = await db.user.findUnique({ where: { id: intID } });

        return user;
    } catch {
        return null;
    }
};
