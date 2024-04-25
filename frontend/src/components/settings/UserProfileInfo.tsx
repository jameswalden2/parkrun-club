import { UserProfileType } from "@/types/UserTypes";
import UserProfileItem from "./UserProfileItem";

type UserProfileInfoProps = {
    userProfile: UserProfileType | null;
};

export default function UserProfileInfo({ userProfile }: UserProfileInfoProps) {
    return (
        <div className="space-y-2">
            <h5>Profile Info:</h5>
            {userProfile && (
                <>
                    <UserProfileItem label="Name" info={userProfile.name} />
                    <UserProfileItem
                        label="Username"
                        info={userProfile.username}
                    />
                    <UserProfileItem
                        label="Member since"
                        info={userProfile.createdAt.toDateString()}
                    />
                </>
            )}
            {!userProfile && <p>No data available</p>}
        </div>
    );
}
