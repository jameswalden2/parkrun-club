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

export default function ClubSettings() {
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
                    <div className="flex items-center space-x-2"></div>
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
