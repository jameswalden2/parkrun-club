import { UserProfileType } from "@/types/UserTypes";
import { Label } from "../ui/label";
import UserProfileItem from "./UserProfileItem";

type UserStatsProps = {
    userProfile: UserProfileType | null;
};

export default function UserStats({ userProfile }: UserStatsProps) {
    return (
        <div className="space-y-2">
            <h5>Stats:</h5>
            {userProfile && (
                <>
                    <UserProfileItem
                        label="Number of Parkruns"
                        info={userProfile.completedParkruns}
                    />
                    <UserProfileItem
                        label="Parkrun Club Memberships"
                        info={userProfile.memberships}
                    />
                </>
            )}
            {!userProfile && <p>No profile data available.</p>}
        </div>
    );
}
