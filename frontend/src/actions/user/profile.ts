"use server";

import * as z from "zod";

import { db } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { UserProfileType } from "@/types/UserTypes";
import { UpdateUserSettingsSchema } from "@/schemas";

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
        where: { id: user.id },
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

export type UpdateUserProfileResultType = {
    success: boolean;
    newProfile: UserProfileType | null;
    code: string;
};

export const getUserInformation = async (): Promise<UserProfileType | null> => {
    const user = await currentUser();

    if (!user) {
        throw new Error("Not authorised!");
    }

    let userInfo = await db.user.findUnique({
        where: { id: user.id },
        select: {
            id: true,
            name: true,
            username: true,
        },
    });

    return userInfo;
};

export const updateUserProfile = async (
    values: z.infer<typeof UpdateUserSettingsSchema>
): Promise<UpdateUserProfileResultType> => {
    const validatedFields = UpdateUserSettingsSchema.safeParse(values);
    if (!validatedFields.success) {
        return { success: false, newProfile: null, code: "invalid_fields" };
    }

    const { username, newPassword, name } = validatedFields.data;

    const user = await currentUser();

    if (!user) {
        throw new Error("Not authorised!");
    }

    const updatedUser = await db.user.update({
        where: {
            id: user.id,
        },
        data: {
            name: name,
        },
        select: {
            id: true,
            name: true,
            username: true,
        },
    });

    return {
        success: true,
        newProfile: updatedUser,
        code: "success",
    };
};
