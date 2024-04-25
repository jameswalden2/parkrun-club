import clsx from "clsx";
import { PropsWithChildren, useCallback } from "react";

export type BoxWrapperProps = {
    success?: boolean;
    warning?: boolean;
    danger?: boolean;
    className?: string;
    backgroundColour?: string;
};

export default function InfoBoxWrapper({
    success = false,
    warning = false,
    danger = false,
    backgroundColour,
    className,
    children,
}: PropsWithChildren<BoxWrapperProps>) {
    let bgColour: string = "bg-card";

    const getBgColour = useCallback(
        (danger: boolean, warning: boolean, success: boolean) => {
            if (danger) {
                return "bg-red-600";
            } else if (warning) {
                return "bg-orange-400";
            } else if (success) {
                return "bg-green-400";
            }
            return "bg-card";
        },
        []
    );

    if (backgroundColour) {
        bgColour = backgroundColour;
    } else if (success || warning || danger) {
        bgColour = getBgColour(danger, warning, success);
    }

    const textColour = bgColour == "bg-card" ? "text-black" : "text-white";
    return (
        <div
            className={clsx(
                "p-4 rounded-md space-y-2",
                bgColour,
                textColour,
                className
            )}
        >
            {children}
        </div>
    );
}
