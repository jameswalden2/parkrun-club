import { ParkrunType } from "./ParkrunTypes";

export type CompletedParkrunType = {
    id: number;
    parkrunId: number;
    userId: string;
    noOfCompletions: number;
    parkrun: ParkrunType;
};
