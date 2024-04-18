"use client";
import NavigationBarItem from "./NavigationBarItem";
import { Home, Wrench, Users, Cog, ClipboardList } from "lucide-react";
import BarWrapper from "../wrappers/BarWrapper";

export default function NavigationBar() {
    return (
        <BarWrapper>
            <NavigationBarItem
                title="Club Dashboard"
                Icon={Home}
                linkHref="/parkrunclub"
            />
            <NavigationBarItem
                title="Create a Club"
                Icon={Wrench}
                linkHref="/club/create"
            />
            <NavigationBarItem
                title="Join a Club"
                Icon={Users}
                linkHref="/club/join"
            />
            <NavigationBarItem
                title="Memberships"
                Icon={ClipboardList}
                linkHref="/club/memberships"
            />
            <NavigationBarItem
                title="User Settings"
                Icon={Cog}
                linkHref="/settings"
            />
        </BarWrapper>
    );
}
