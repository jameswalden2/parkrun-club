import { atom } from "jotai";

import { LeaderboardRowType } from "@/types/LeaderboardTypes";
import { CompletedParkrunType } from "@/types/CompletedParkrunsTypes";
import {
    ParkrunClubMembershipType,
    ParkrunClubType,
} from "@/types/ParkrunClubTypes";
import { UserProfileType, UserSettingsType } from "@/types/UserTypes";

export const completedParkrunsAtom = atom<Array<CompletedParkrunType>>([]);

export const leaderboardDataAtom = atom<Array<LeaderboardRowType>>([]);

export const parkrunClubMembershipsAtom = atom<
    Array<ParkrunClubMembershipType>
>([]);

export const myParkrunClubsAtom = atom<Array<ParkrunClubType>>([]);

export const activeParkrunClubAtom = atom<ParkrunClubType | null>(null);

export const isClubMapSelectedAtom = atom<boolean>(false);

export const userSettingsAtom = atom<UserSettingsType | null>(null);

export const userProfileAtom = atom<UserProfileType | null>(null);

export const isFetchingCompletedParkrunsAtom = atom<boolean>(false);

export const isUpdatingCompletedParkrunsAtom = atom<boolean>(false);
