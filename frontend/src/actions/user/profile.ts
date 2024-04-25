"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { UserProfileType } from "@/types/UserTypes";

export type UserProfileResultType = {
    success: boolean;
    profile: UserProfileType | null;
    code: string;
};

export const getUserProfile = async (): Promise<UserProfileResultType> => {
    const user = await currentUser();

    if (!user) {
        throw new Error("Not authorised!");
    }

    let userProfile = await db.user.findUnique({
        where: { id: Number(user.id) },
        select: {
            id: true,
            name: true,
            username: true,
            createdAt: true,
            _count: {
                select: {
                    memberships: true,
                    completedParkruns: true,
                },
            },
        },
    });

    if (!userProfile) {
        return {
            success: false,
            profile: null,
            code: "no_profile",
        };
    }

    const mappedUserProfile: UserProfileType = {
        ...userProfile,
        memberships: userProfile._count.memberships,
        completedParkruns: userProfile._count.completedParkruns,
    };

    return { success: true, profile: mappedUserProfile, code: "success" };
};
