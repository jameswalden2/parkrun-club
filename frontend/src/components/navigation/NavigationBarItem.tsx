"use client";
import Link from "next/link";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { useMemo } from "react";

type SidebarItemProps = {
    Icon?: LucideIcon;
    title: string;
    linkHref?: string;
    action?: Function;
};

export default function NavigationBarItem({
    Icon,
    title,
    linkHref,
    action,
}: SidebarItemProps) {
    const innerElements = useMemo(
        () => (
            <a
                className={clsx(
                    "group inline-flex h-10 w-full items-center justify-left bg-gray-50 px-4 py-2 text-sm font-medium",
                    "transition-colors hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                    "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "w-full gap-4",
                    "whitespace-nowrap"
                )}
            >
                {Icon && <Icon size={16} />}
                {Icon && " "}
                {title}
            </a>
        ),
        [Icon, title]
    );
    return (
        <li>
            {linkHref && (
                <Link legacyBehavior href={linkHref}>
                    {innerElements}
                </Link>
            )}
            {action && <div onClick={() => action()}>{innerElements}</div>}
        </li>
    );
}
