import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useAtom } from "jotai";
import { isClubMapSelectedAtom } from "@/atoms/atoms";

export default function IndividualClubToggle() {
    const [isClubMapSelected, setIsClubMapSelected] = useAtom(
        isClubMapSelectedAtom
    );
    return (
        <div className="flex items-center space-x-2 rounded-md bg-slate-100 p-4">
            <Switch
                id="individualClubToggle"
                checked={isClubMapSelected}
                onCheckedChange={() =>
                    setIsClubMapSelected((val) => {
                        return !val;
                    })
                }
            />
            <Label htmlFor="individualClubToggle">
                {isClubMapSelected ? "Club" : "Individual"}
            </Label>
        </div>
    );
}
