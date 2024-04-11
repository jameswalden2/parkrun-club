"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

import { useGetEvents } from "@/hooks/useGetEvents";
import { useGetSeasons } from "@/hooks/useGetSeasons";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default function Header() {
    const getEvents = useGetEvents();
    const getSeasons = useGetSeasons();
    const handleGetDataAgain = async () => {
        await getEvents(123);
        await getSeasons();
    };
    return (
        <header className="flex py-2 w-full items-center justify-between border-b border-solid px-10 bg-card">
            <Link href="/portal">
                <Image
                    src="/icons8/icons8-bar-chart.gif"
                    alt="Bar chart"
                    width={50}
                    height={50}
                    className="object-contain"
                    unoptimized
                />
            </Link>
            <Button onClick={handleGetDataAgain}>Po10 Portal</Button>
            <LogoutButton>Logout</LogoutButton>
        </header>
    );
}
