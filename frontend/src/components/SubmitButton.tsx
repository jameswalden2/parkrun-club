import { Loader2 } from "lucide-react";

import { Button } from "./ui/button";

import clsx from "clsx";

type SubmitButtonProps = {
    isLoading: boolean;
};

export default function SubmitButton({ isLoading }: SubmitButtonProps) {
    return (
        <Button
            className="bg-foreground hover:bg-muted-foreground"
            disabled={isLoading}
        >
            {isLoading && <Loader2 className="mr-2 animate-spin" />}
            Submit
        </Button>
    );
}
