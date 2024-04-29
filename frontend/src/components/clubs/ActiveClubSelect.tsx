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

import { useEffect, useState, useTransition } from "react";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";
import { getClubs } from "@/actions/getClubs";

import { useAtom } from "jotai";
import { activeParkrunClubAtom } from "@/atoms/atoms";
import InfoBoxWrapper from "../wrappers/InfoBoxWrapper";
import RedirectButton from "./RedirectButton";

export default function ActiveClubSelect() {
    const [activeParkrunClub, setActiveParkrunClub] = useAtom(
        activeParkrunClubAtom
    );
    const [availableParkrunClubs, setAvailableParkrunClubs] = useState<
        Array<ParkrunClubType>
    >([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            getClubs()
                .then((data) => {
                    setAvailableParkrunClubs(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }, []);

    const changeActiveParkrunClub = async (
        newActiveParkrunClub: ParkrunClubType
    ) => {
        const setActiveClubResult = await setActiveClub(newActiveParkrunClub);
        if (setActiveClubResult.success) {
            console.log(
                `Setting active parkrun data: ${JSON.stringify(
                    newActiveParkrunClub
                )}`
            );
            setActiveParkrunClub(newActiveParkrunClub);
        } else {
            console.log("Unable to set new active parkrun club");
        }
    };
    return (
        <div className="flex items-center space-x-2">
            {availableParkrunClubs && availableParkrunClubs.length > 0 && (
                <Select
                    value={activeParkrunClub?.id.toString()}
                    disabled={isPending}
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
            )}

            {availableParkrunClubs &&
                availableParkrunClubs.length == 0 &&
                !isPending && (
                    <InfoBoxWrapper>
                        <p>
                            Looks like you&apos;re not part of any clubs, go and
                            create a new club or join an existing one!
                        </p>
                        <RedirectButton
                            buttonText="Create a Club"
                            redirectURL="/club/create"
                            className="mt-4"
                        />
                        <RedirectButton
                            className="mt-4"
                            buttonText="Join a Club"
                            redirectURL="/club/join"
                        />
                    </InfoBoxWrapper>
                )}
        </div>
    );
}
