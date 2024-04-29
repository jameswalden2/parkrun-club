export type UserType = {
    username?: string;
    name?: string;
    id?: string;
    password?: string | null;
    subid?: string | null;
    activeParkrunClubId?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
};

export type UserSettingsType = {
    theme?: string;
};

export type UserProfileType = {
    id: string;
    name: string;
    username: string;
    memberships?: number;
    completedParkruns?: number;
    createdAt?: Date;
};
