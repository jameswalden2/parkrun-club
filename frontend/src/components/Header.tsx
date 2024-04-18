"use client";
import Link from "next/link";
import { Trees } from "lucide-react";
import clsx from "clsx";

import { LogoutButton } from "@/components/auth/LogoutButton";

import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export default function Header() {
    return (
        <header className="flex py-2 w-full items-center justify-between border-b border-solid px-10 bg-card">
            <Link href="/parkrunclub">
                <Trees />
            </Link>
            <p className={cn("text-2xl font-semibold", font.className)}>
                parkrun Club
            </p>
            <LogoutButton>Logout</LogoutButton>
        </header>
    );
}
