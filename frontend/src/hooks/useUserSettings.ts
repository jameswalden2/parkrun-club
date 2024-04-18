"use client";

import { userSettingsAtom } from "@/atoms/atoms";
import { useAtomValue } from "jotai";

export default function useUserSettings() {
    const userSettings = useAtomValue(userSettingsAtom);
    return userSettings;
}
