"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import ParkrunDashboard from "@/components/parkrun/ParkrunDashboard";
import ParkrunCompletedTable from "@/components/tables/ParkrunCompletedTable";
import ClubLeaderboardTable from "@/components/tables/club/ClubLeaderboardTable";
import ClubToolBar from "@/components/clubs/ClubToolBar";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { activeParkrunClubAtom } from "@/atoms/atoms";
import { getActiveClub } from "@/actions/club/active/getActiveClub";

export default function ParkrunClub() {
    const setActiveParkrunClub = useSetAtom(activeParkrunClubAtom);
    useEffect(() => {
        getActiveClub().then((data) => {
            setActiveParkrunClub(data);
        });
    }, [setActiveParkrunClub]);
    return (
        <div className="h-full w-full overflow-y-auto">
            <ClubToolBar />
            <ParkrunDashboard />
            <div className="h-[800px] p-8 gap-8 w-full flex justify-around">
                <div className="w-1/2 space-y-4 justify-center">
                    <h4>Your completed parkruns:</h4>
                    <ParkrunCompletedTable />
                </div>
                <div className="w-1/2 space-y-4 justify-center">
                    <h4>Club parkrunners:</h4>
                    <ClubLeaderboardTable />
                </div>
            </div>
        </div>
    );
}
