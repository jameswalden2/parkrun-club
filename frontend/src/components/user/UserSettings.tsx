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

export default function UserSettings() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="space-x-2 gap-2" variant="outline">
                    <Cog size={16} /> User Settings
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
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <span className="w-full flex justify-center font-semibold text-lg">
                            A4BD 5FG2
                        </span>
                    </div>
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
