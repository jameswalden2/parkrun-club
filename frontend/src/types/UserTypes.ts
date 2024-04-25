export type UserType = {
    username?: string;
    name?: string;
    id?: number;
};

export type UserSettingsType = {
    theme: string | null;
};

export type UserProfileType = {
    id: number;
    name: string;
    username: string;
    memberships: number;
    completedParkruns: number;
    createdAt: Date;
};
