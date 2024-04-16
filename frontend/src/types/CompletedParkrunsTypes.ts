import { ParkrunType } from "./ParkrunTypes";

export type CompletedParkrunType = {
    parkrunId: number;
    userId: number;
    noOfCompletions: number;
    parkrun: ParkrunType;
};
