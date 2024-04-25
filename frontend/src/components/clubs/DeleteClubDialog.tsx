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

import { Button } from "../ui/button";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";

import { deleteClub } from "@/actions/club/deleteClub";

import { useAtom, useSetAtom } from "jotai";
import { activeParkrunClubAtom, myParkrunClubsAtom } from "@/atoms/atoms";
import { myClubs } from "@/data/club";

import { setActiveClub } from "@/actions/club/active/setActiveClub";

type DeleteClubDialogProps = {
    parkrunClub: ParkrunClubType;
    isPending: boolean;
};

export default function DeleteClubDialog({
    parkrunClub,
    isPending,
}: DeleteClubDialogProps) {
    const setMyParkrunClubs = useSetAtom(myParkrunClubsAtom);
    const [activeParkrunClub, setActiveParkrunClub] = useAtom(
        activeParkrunClubAtom
    );

    const handleDeleteClub = (parkrunClub: ParkrunClubType) => {
        deleteClub(parkrunClub).then(async (data) => {
            if (!data.success) {
                return;
            }
            myClubs().then((data) => {
                setMyParkrunClubs(data);
            });
            if (activeParkrunClub && activeParkrunClub.id == parkrunClub.id) {
                setActiveParkrunClub(null);
                await setActiveClub(null);
            }
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-destructive" disabled={isPending}>
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete {parkrunClub.name}</DialogTitle>
                    <DialogDescription>
                        This action is irreversible.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Button
                        onClick={() => {
                            handleDeleteClub(parkrunClub);
                        }}
                        size="sm"
                        className="w-full bg-destructive"
                    >
                        Delete
                    </Button>
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
    );
}
