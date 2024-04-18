import UpdateSettingsForm from "./UpdateSettingsForm";
import UpdateParkrunData from "./UpdateParkrunData";

export default function UserSettings() {
    return (
        <div className="w-full space-y-8 pt-8 flex flex-col align-middle justify-center overflow-y-auto">
            <UpdateSettingsForm />
            <UpdateParkrunData />
        </div>
    );
}
