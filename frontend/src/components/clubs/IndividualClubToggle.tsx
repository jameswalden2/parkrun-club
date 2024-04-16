import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useAtom } from "jotai";
import { isClubSelectedAtom } from "@/atoms/atoms";

export default function IndividualClubToggle() {
    const [isClubSelected, setIsClubSelected] = useAtom(isClubSelectedAtom);
    return (
        <div className="flex items-center space-x-2 rounded-md bg-slate-100 p-4">
            <Switch
                id="individualClubToggle"
                checked={isClubSelected}
                onCheckedChange={() =>
                    setIsClubSelected((val) => {
                        return !val;
                    })
                }
            />
            <Label htmlFor="individualClubToggle">
                {isClubSelected ? "Club" : "Individual"}
            </Label>
        </div>
    );
}
