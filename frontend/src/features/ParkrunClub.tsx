"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import ParkrunDashboard from "@/components/parkrun/ParkrunDashboard";
import ParkrunCompletedTable from "@/components/tables/ParkrunCompletedTable";
import ClubLeaderboardTable from "@/components/tables/club/ClubLeaderboardTable";
import ClubToolBar from "@/components/clubs/ClubToolBar";

import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
    activeParkrunClubAtom,
    userSettingsAtom,
    completedParkrunsAtom,
    isClubMapSelectedAtom,
} from "@/atoms/atoms";
import { getActiveClub } from "@/actions/club/active/getActiveClub";
import { getSettings } from "@/actions/settings/getSettings";
import { completedParkruns } from "@/data/completedParkruns";

export default function ParkrunClub() {
    const [activeParkrunClub, setActiveParkrunClub] = useAtom(
        activeParkrunClubAtom
    );
    const setCompletedParkrunList = useSetAtom(completedParkrunsAtom);
    const isClubMapSelected = useAtomValue(isClubMapSelectedAtom);
    const setUserSettings = useSetAtom(userSettingsAtom);
    useEffect(() => {
        if (!activeParkrunClub) {
            getActiveClub()
                .then((data) => {
                    console.log(
                        `Setting active parkrun data: ${JSON.stringify(data)}`
                    );
                    if (!data || !data.parkrunClub) {
                        return;
                    }
                    setActiveParkrunClub(data.parkrunClub);
                })
                .catch((error) => {
                    console.log("Error getting active club:");
                    console.log(error);
                });
            getSettings()
                .then((data) => {
                    if (!data) {
                        return;
                    }
                    setUserSettings(data.settings);
                })
                .catch((error) => {
                    console.log("Error getting settings:");
                    console.log(error);
                });
        }
    }, [
        activeParkrunClub,
        setUserSettings,
        setActiveParkrunClub,
        setCompletedParkrunList,
    ]);

    useEffect(() => {
        completedParkruns(isClubMapSelected, activeParkrunClub?.id)
            .then((x) => {
                setCompletedParkrunList(x);
            })
            .catch((error) => {
                console.log("Error getting completedParkruns");
                console.log(error);
            });
    }, [isClubMapSelected, activeParkrunClub, setCompletedParkrunList]);

    return (
        <div className="w-full">
            <ClubToolBar />
            <ParkrunDashboard />
            <div className="p-8 gap-8 w-full flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 space-y-4 justify-center">
                    <h4>Club parkrunners:</h4>
                    <ClubLeaderboardTable />
                </div>
                <div className="w-full md:w-1/2 space-y-4 justify-center mb-8">
                    <h4>
                        {isClubMapSelected && activeParkrunClub
                            ? `${activeParkrunClub.name}'s`
                            : "Your"}{" "}
                        parkruns:
                    </h4>
                    <ParkrunCompletedTable />
                </div>
            </div>
        </div>
    );
}
