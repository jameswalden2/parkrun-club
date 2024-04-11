"use client";
import SidebarItem from "./SidebarItem";
import {
    Home,
    AreaChart,
    Cog,
    User2,
    MessagesSquare,
    Map,
    Trees,
} from "lucide-react";

export default function Sidebar() {
    return (
        <ul className="flex flex-col w-full h-full space-y-16 p-2 items-center justify-center sticky top-0">
            <SidebarItem Icon={Home} linkHref="/portal" />
            <SidebarItem Icon={AreaChart} linkHref="/portal/data" />
            <SidebarItem Icon={MessagesSquare} linkHref="/chat" />
            <SidebarItem Icon={Map} linkHref="/daysout" />
            <SidebarItem Icon={Trees} linkHref="/parkrunclub" />
            <SidebarItem Icon={Cog} linkHref="/" />
            <SidebarItem Icon={User2} linkHref="/" />
        </ul>
    );
}
