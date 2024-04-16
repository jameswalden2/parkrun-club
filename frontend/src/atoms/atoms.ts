import { atom } from "jotai";

import { LeaderboardRowType } from "@/types/LeaderboardTypes";
import { CompletedParkrunType } from "@/types/CompletedParkrunsTypes";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";

export const completedParkrunsAtom = atom<Array<CompletedParkrunType>>([]);

export const leaderboardDataAtom = atom<Array<LeaderboardRowType>>([]);

export const activeParkrunClubAtom = atom<ParkrunClubType | null>(null);

export const isClubSelectedAtom = atom<boolean>(false);
