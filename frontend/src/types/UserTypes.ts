export type UserType = {
    username?: string;
    name?: string;
    id?: string;
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
