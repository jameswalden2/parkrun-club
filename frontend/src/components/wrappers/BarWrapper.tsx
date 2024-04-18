import clsx from "clsx";
import { PropsWithChildren, useEffect, useState } from "react";

type BarWrapperProps = {
    className?: string;
};

export default function BarWrapper({
    className,
    children,
}: PropsWithChildren<BarWrapperProps>) {
    return (
        <div className={clsx("w-full bg-gray-50", className)}>
            <ul className="w-full flex justify-start items-center">
                {children}
            </ul>
        </div>
    );
}
