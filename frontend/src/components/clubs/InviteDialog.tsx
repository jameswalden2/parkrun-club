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
import { Copy, Mails } from "lucide-react";

import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { copyTextToClipboard } from "@/lib/utils";
import { useAtom } from "jotai";
import { activeParkrunClubAtom } from "@/atoms/atoms";
import RedirectButton from "./RedirectButton";
import ActiveClubSelect from "./ActiveClubSelect";

export default function InviteDialog() {
    const [activeParkrunClub, setActiveParkrunClub] = useAtom(
        activeParkrunClubAtom
    );
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="space-x-2 gap-2" variant="outline">
                    <Mails size={16} /> Invite Friends
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Club Code</DialogTitle>
                    <DialogDescription>
                        Anyone who has this code will be able to join your
                        parkrun club.
                    </DialogDescription>
                </DialogHeader>
                {activeParkrunClub && (
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <span className="w-full flex justify-center font-semibold text-lg">
                                {activeParkrunClub.uniqueCode}
                            </span>
                        </div>
                        <Button
                            onClick={() => {
                                copyTextToClipboard(
                                    activeParkrunClub.uniqueCode
                                );
                            }}
                            size="sm"
                            className="px-3"
                        >
                            <span className="sr-only">Copy</span>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                )}
                {!activeParkrunClub && (
                    <div className="p-4 bg-orange-400 text-white rounded-md space-y-2">
                        <h5>
                            You don&apos;t have an active club. Select one below
                            or create one:
                        </h5>
                        <ActiveClubSelect />
                        <RedirectButton
                            buttonText="Create a Club"
                            redirectURL="/club/create"
                            className="mt-2"
                        />
                    </div>
                )}
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
