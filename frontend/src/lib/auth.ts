import { auth } from "@baseauth";

export const currentUser = async () => {
    const session = await auth();
    console.log("-------current user");
    console.log({ session });
    return session?.user;
};
