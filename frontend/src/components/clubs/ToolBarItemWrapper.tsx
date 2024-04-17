import clsx from "clsx";
import { PropsWithChildren } from "react";

type ToolBarItemWrapperProps = {
    className?: string;
};

export default function ToolbarItemWrapper({
    children,
    className,
}: PropsWithChildren<ToolBarItemWrapperProps>) {
    return <div className={clsx("mr-2", className)}>{children}</div>;
}
