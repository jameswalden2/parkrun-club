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

import { GalleryVerticalEnd } from "lucide-react";

import { Button } from "../ui/button";

import { useAtomValue } from "jotai";
import { activeParkrunClubAtom } from "@/atoms/atoms";
import ActiveClubSelect from "./ActiveClubSelect";

export default function SelectClubDialog() {
    const activeParkrunClub = useAtomValue(activeParkrunClubAtom);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="space-x-2 gap-2" variant="outline">
                    <GalleryVerticalEnd size={16} />{" "}
                    {activeParkrunClub ? activeParkrunClub.name : "Pick a Club"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Select Your Club</DialogTitle>
                    <DialogDescription>
                        Pick which of your clubs you want to see in the
                        dashboard.
                    </DialogDescription>
                </DialogHeader>
                <ActiveClubSelect />
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
