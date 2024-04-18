import { ParkrunType } from "./ParkrunTypes";

export type CompletedParkrunType = {
    id: number;
    parkrunId: number;
    userId: number;
    noOfCompletions: number;
    parkrun: ParkrunType;
};
