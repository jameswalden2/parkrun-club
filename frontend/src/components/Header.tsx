"use client";
import Link from "next/link";
import { Trees } from "lucide-react";

import { LogoutButton } from "@/components/auth/LogoutButton";

import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export default function Header() {
    const user = useCurrentUser();
    return (
        <header className="flex py-2 w-full items-center justify-between border-b border-solid px-10 bg-card">
            <Link className="w-1/5" href="/parkrunclub">
                <Trees />
            </Link>
            <p
                className={cn(
                    "text-2xl font-semibold w-1/2 text-center",
                    font.className
                )}
            >
                <Link href="/parkrunclub">parkrun Club</Link>
            </p>

            {user && (
                <span className=" hidden sm:flex space-x-2 w-1/5 justify-end items-center">
                    {user && <p className="font-semibold">{user.name},</p>}
                    <LogoutButton>Logout</LogoutButton>
                </span>
            )}
            {!user && <div className="w-1/5">&nbsp;</div>}
        </header>
    );
}
