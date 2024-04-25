import {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog";

import { Cog } from "lucide-react";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import SettingsOptionsWrapper from "../wrappers/SettingsOptionWrapper";
import { Input } from "../ui/input";
import { useAtom, useAtomValue } from "jotai";
import { activeParkrunClubAtom } from "@/atoms/atoms";
import { useState } from "react";

import InfoBoxWrapper from "../wrappers/InfoBoxWrapper";
import { Separator } from "../ui/separator";

export default function ClubSettings() {
    const activeParkrunClub = useAtomValue(activeParkrunClubAtom);

    const [deleteClubActivated, setDeleteClubActivated] =
        useState<boolean>(false);

    const [newClubName, setNewClubName] = useState<String | null>();

    const handleRenameClub = () => {
        if (!newClubName || newClubName.length == 0) {
            return;
        }
    };
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="space-x-2 gap-2" variant="outline">
                        <Cog size={16} /> Club Settings
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Club Settings:</DialogTitle>
                        <DialogDescription>
                            Adjust the information for your club.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center">
                        <SettingsOptionsWrapper className="mb-8 gap-2">
                            <Label>Rename Club</Label>
                            <Input
                                className="grow"
                                placeholder="clubname"
                                value={newClubName}
                                defaultValue={activeParkrunClub?.name}
                            />
                            <Button onClick={() => handleRenameClub}>
                                Rename
                            </Button>
                        </SettingsOptionsWrapper>
                        <Separator />
                        <SettingsOptionsWrapper className="mt-8">
                            <Label>Delete Club</Label>
                            <Button
                                className="bg-destructive"
                                onClick={() =>
                                    setDeleteClubActivated((oldVal) => !oldVal)
                                }
                            >
                                {deleteClubActivated ? "Cancel" : "Delete"}
                            </Button>
                        </SettingsOptionsWrapper>
                        {deleteClubActivated && (
                            <InfoBoxWrapper warning className="w-full mt-2">
                                <h5>
                                    Are you sure you want to delete{" "}
                                    {activeParkrunClub?.name || ""}?
                                </h5>
                                <p>This action is irrecoverable.</p>
                                <Button className="w-full bg-destructive">
                                    Delete
                                </Button>
                            </InfoBoxWrapper>
                        )}
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
