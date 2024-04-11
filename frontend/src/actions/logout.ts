"use server";

import { signOut } from "@baseauth";

export const logout = async () => {
    await signOut();
};
