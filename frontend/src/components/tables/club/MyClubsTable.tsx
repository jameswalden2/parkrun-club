"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../DataTable";

import { ParkrunClubType } from "@/types/ParkrunClubTypes";

import { useAtom } from "jotai";
import { activeParkrunClubAtom, myParkrunClubsAtom } from "@/atoms/atoms";

import { useCallback, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CircleDot } from "lucide-react";
import { myClubs } from "@/data/club";
import DateFormatter from "@/components/dates/DateFormatter";
import { copyTextToClipboard } from "@/lib/utils";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

import DeleteClubDialog from "@/components/clubs/DeleteClubDialog";

type MyClubsTableProps = {
    className?: string;
    pageSize?: number;
};

export default function MyClubsTable({
    pageSize,
    className,
}: MyClubsTableProps) {
    const [myParkrunClubs, setMyParkrunClubs] = useAtom(myParkrunClubsAtom);

    const [activeParkrunClub, setActiveParkrunClub] = useAtom(
        activeParkrunClubAtom
    );

    const [isPending, startTransition] = useTransition();

    const getMyClubs = useCallback(() => {
        myClubs()
            .then((data) => {
                setMyParkrunClubs(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setMyParkrunClubs]);

    useEffect(() => {
        getMyClubs();
    }, [getMyClubs]);

    let columns: ColumnDef<ParkrunClubType>[] = [
        {
            accessorKey: "name",
            header: "Club name",
        },
        {
            accessorKey: "uniqueCode",
            header: "Club Code",
            cell: ({ row }) => {
                return (
                    <div>
                        <HoverCard openDelay={0.2} closeDelay={0.2}>
                            <HoverCardTrigger asChild>
                                <span
                                    onClick={() =>
                                        copyTextToClipboard(
                                            row.original.uniqueCode
                                        )
                                    }
                                    className="p-2 rounded-sm shadow-md cursor-pointer"
                                >
                                    {row.original.uniqueCode}
                                </span>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-auto">
                                <div>
                                    <p className="text-sm">Click to copy</p>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                );
            },
        },
        {
            accessorKey: "_count.memberships",
            header: "Members",
        },
        {
            accessorKey: "createdAt",
            header: "Created On",
            cell: ({ row }) => {
                return <DateFormatter dateString={row.original.createdAt} />;
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <DeleteClubDialog
                        parkrunClub={row.original}
                        isPending={isPending}
                    />
                );
            },
        },
        {
            id: "active",
            header: "Active",
            cell: ({ row }) => {
                return activeParkrunClub &&
                    activeParkrunClub?.id == row.original.id ? (
                    <div className="w-full flex justify-start items-center">
                        <CircleDot opacity={0.8} className="" color="green" />
                    </div>
                ) : (
                    ""
                );
            },
        },
    ];

    return (
        <div className={className}>
            <DataTable
                columns={columns}
                data={myParkrunClubs || []}
                pageSize={pageSize}
            />
        </div>
    );
}
