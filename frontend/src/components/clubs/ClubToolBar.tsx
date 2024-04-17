import BarWrapper from "../navigation/BarWrapper";
import ClubSettings from "./ClubSettings";
import InviteDialog from "./InviteDialog";
import SelectClubDialog from "./SelectClubDialog";
import ToolbarItemWrapper from "./ToolBarItemWrapper";

export default function ClubToolBar() {
    return (
        <BarWrapper className="p-2 space-x-2 gap-2">
            <ToolbarItemWrapper>
                <SelectClubDialog />
            </ToolbarItemWrapper>
            <ToolbarItemWrapper>
                <InviteDialog />
            </ToolbarItemWrapper>
            <ToolbarItemWrapper>
                <ClubSettings />
            </ToolbarItemWrapper>
        </BarWrapper>
    );
}
