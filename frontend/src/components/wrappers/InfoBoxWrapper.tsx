import clsx from "clsx";
import { PropsWithChildren } from "react";

export type BoxWrapperProps = {
    success?: boolean;
    warning?: boolean;
    className?: string;
};

export default function InfoBoxWrapper({
    success = false,
    warning = false,
    className,
    children,
}: PropsWithChildren<BoxWrapperProps>) {
    const bgColour = success
        ? "bg-green-400"
        : warning
        ? "bg-orange-400"
        : "bg-card";

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
