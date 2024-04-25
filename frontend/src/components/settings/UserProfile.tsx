"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { CardWrapper } from "../auth/CardWrapper";
import { useEffect } from "react";
import { getUserProfile } from "@/actions/user/profile";
import { userProfileAtom } from "@/atoms/atoms";
import { useAtom } from "jotai";
import UserProfileInfo from "./UserProfileInfo";
import UserStats from "./UserStats";

export default function UserProfile() {
    const [userProfile, setUserProfile] = useAtom(userProfileAtom);
    const user = useCurrentUser();

    useEffect(() => {
        getUserProfile().then((data) => {
            if (!data.success) {
                return;
            }
            setUserProfile(data.profile);
        });
    }, [setUserProfile]);
    return (
        <CardWrapper
            headerTitle="Your Profile"
            headerLabel="Your parkrunClub profile."
            className="w-full"
        >
            <div className="w-2/3 flex flex-col mx-auto gap-8">
                <UserProfileInfo userProfile={userProfile} />
                <UserStats userProfile={userProfile} />
            </div>
        </CardWrapper>
    );
}
