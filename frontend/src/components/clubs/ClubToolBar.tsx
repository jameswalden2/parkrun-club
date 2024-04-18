import { useCurrentUser } from "@/hooks/useCurrentUser";
import BarWrapper from "../wrappers/BarWrapper";
import ClubSettings from "./ClubSettings";
import InviteDialog from "./InviteDialog";
import SelectClubDialog from "./SelectClubDialog";
import ToolbarItemWrapper from "./ToolBarItemWrapper";
import { useAtomValue } from "jotai";
import { activeParkrunClubAtom } from "@/atoms/atoms";

export default function ClubToolBar() {
    const user = useCurrentUser();
    const activeParkrunClub = useAtomValue(activeParkrunClubAtom);
    return (
        <BarWrapper className="p-2 space-x-2 gap-2">
            <ToolbarItemWrapper>
                <SelectClubDialog />
            </ToolbarItemWrapper>
            <ToolbarItemWrapper>
                <InviteDialog />
            </ToolbarItemWrapper>
            {activeParkrunClub &&
                activeParkrunClub.ownerId &&
                user.id == activeParkrunClub.ownerId.toString() && (
                    <ToolbarItemWrapper>
                        <ClubSettings />
                    </ToolbarItemWrapper>
                )}
            {JSON.stringify(activeParkrunClub)}
        </BarWrapper>
    );
}
