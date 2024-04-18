import { UserType } from "./UserTypes";

export type ParkrunClubType = {
    id: number;
    name: string;
    uniqueCode: string;
    ownerId?: number;
    owner?: UserType;
};

export type ParkrunClubMembershipType = {
    userId: number;
    parkrunClub: ParkrunClubType;
    createdAt: Date;
};
