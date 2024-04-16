import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

import { setActiveClub } from "@/actions/club/active/setActiveClub";

import { useEffect, useState } from "react";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";
import { getClubs } from "@/actions/getClubs";

import { useAtom } from "jotai";
import { activeParkrunClubAtom } from "@/atoms/atoms";

export default function ActiveClubSelect() {
    const [activeParkrunClub, setActiveParkrunClub] = useAtom(
        activeParkrunClubAtom
    );
    const [availableParkrunClubs, setAvailableParkrunClubs] = useState<
        Array<ParkrunClubType>
    >([]);

    useEffect(() => {
        getClubs()
            .then((data) => {
                setAvailableParkrunClubs(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const changeActiveParkrunClub = async (
        newActiveParkrunClub: ParkrunClubType
    ) => {
        const setActiveClubResult = await setActiveClub(newActiveParkrunClub);
        if (setActiveClubResult.success) {
            setActiveParkrunClub(newActiveParkrunClub);
        } else {
            console.log("Unable to set new active parkrun club");
        }
    };
    return (
        <div className="flex items-center space-x-2">
            <Select
                value={activeParkrunClub?.id.toString()}
                onValueChange={(val) => {
                    const selectedParkrunClubObject =
                        availableParkrunClubs.find(
                            (element) => element.id.toString() == val
                        );
                    if (selectedParkrunClubObject) {
                        changeActiveParkrunClub(selectedParkrunClubObject);
                    }
                }}
            >
                <SelectTrigger className="text-black">
                    <SelectValue placeholder="Select club" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Your Clubs:</SelectLabel>
                        {availableParkrunClubs.map((parkrunClub) => {
                            return (
                                <SelectItem
                                    value={String(parkrunClub.id)}
                                    key={parkrunClub.id}
                                >
                                    {parkrunClub.name}
                                </SelectItem>
                            );
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
