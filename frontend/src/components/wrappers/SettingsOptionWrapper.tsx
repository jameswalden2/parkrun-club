import clsx from "clsx";
import { PropsWithChildren } from "react";

type SettingsOptionWrapperProps = {
    className?: string;
};

export default function SettingsOptionsWrapper({
    className,
    children,
}: PropsWithChildren<SettingsOptionWrapperProps>) {
    return (
        <div
            className={clsx(
                "flex justify-between w-full items-center",
                className
            )}
        >
            {children}
        </div>
    );
}
