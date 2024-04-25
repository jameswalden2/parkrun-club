import UpdateSettingsForm from "../../components/settings/UpdateSettingsForm";
import UpdateParkrunData from "../../components/settings/UpdateParkrunData";
import UserProfile from "@/components/settings/UserProfile";

export default function UserSettings() {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="grow flex w-full p-8 gap-8 flex-col lg:flex-row">
                <div className="w-full lg:w-1/3">
                    <UserProfile />
                </div>
                <div className="w-full lg:w-1/3">
                    <UpdateSettingsForm />
                </div>
                <div className="w-full lg:w-1/3">
                    <UpdateParkrunData />
                </div>
            </div>
        </div>
    );
}
