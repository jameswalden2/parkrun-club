import BarWrapper from "../navigation/BarWrapper";
import InviteDialog from "./InviteDialog";
import SelectClubDialog from "./SelectClubDialog";

export default function ClubToolBar() {
    return (
        <BarWrapper className="p-2 space-x-2 gap-2">
            <SelectClubDialog />
            <InviteDialog />
        </BarWrapper>
    );
}
