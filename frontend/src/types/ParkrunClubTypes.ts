import { UserType } from "./UserTypes";

export type ParkrunClubType = {
    id: number;
    name: string;
    uniqueCode: string;
    ownerId?: string;
    owner?: UserType;
    createdAt?: Date;
    updatedAt?: Date;
};

export type ParkrunClubMembershipType = {
    id: number;
    userId: string;
    parkrunClub: ParkrunClubType;
    createdAt: Date;
};
