import ParkrunsMap from "../maps/ParkrunsMap";
import ParkrunCompletedTable from "@/components/tables/ParkrunCompletedTable";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import IndividualClubToggle from "../clubs/IndividualClubToggle";

export default function ParkrunDashboard() {
    return (
        <div className="w-full h-[80vh]">
            <div id="map" className="w-full h-full relative">
                <ParkrunsMap />

                <div className="absolute top-0 right-0 m-4 p-2 w-[20%] rounded-sm max-h-[80%] overflow-y-scroll z-20">
                    <ParkrunCompletedTable />
                </div>

                <div className="absolute bottom-5 left-0 m-4 p-2 rounded-sm max-h-[30%] z-20">
                    <IndividualClubToggle />
                </div>
            </div>
        </div>
    );
}
