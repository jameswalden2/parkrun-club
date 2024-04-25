import { UserType } from "./UserTypes";

export type ParkrunClubType = {
    id: number;
    name: string;
    uniqueCode: string;
    ownerId?: number;
    owner?: UserType;
    createdAt?: Date;
    updatedAt?: Date;
};

export type ParkrunClubMembershipType = {
    id: number;
    userId: number;
    parkrunClub: ParkrunClubType;
    createdAt: Date;
};
