"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Trees } from "lucide-react";

import { LogoutButton } from "@/components/auth/LogoutButton";

export default function Header() {
    return (
        <header className="flex py-2 w-full items-center justify-between border-b border-solid px-10 bg-card">
            <Link href="/parkrunclub">
                <Trees />
            </Link>
            <span>parkrun Club</span>
            <LogoutButton>Logout</LogoutButton>
        </header>
    );
}
