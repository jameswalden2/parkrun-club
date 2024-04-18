import { atom } from "jotai";

import { LeaderboardRowType } from "@/types/LeaderboardTypes";
import { CompletedParkrunType } from "@/types/CompletedParkrunsTypes";
import {
    ParkrunClubMembershipType,
    ParkrunClubType,
} from "@/types/ParkrunClubTypes";
import { UserSettingsType } from "@/types/UserTypes";

export const completedParkrunsAtom = atom<Array<CompletedParkrunType>>([]);

export const leaderboardDataAtom = atom<Array<LeaderboardRowType>>([]);

export const parkrunClubMembershipsAtom = atom<
    Array<ParkrunClubMembershipType>
>([]);

export const activeParkrunClubAtom = atom<ParkrunClubType | null>(null);

export const isClubSelectedAtom = atom<boolean>(false);

export const userSettingsAtom = atom<UserSettingsType | null>(null);
