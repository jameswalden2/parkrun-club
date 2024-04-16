import { auth } from "@baseauth";

export const currentUser = async () => {
    const session = await auth();
    return session?.user;
};
