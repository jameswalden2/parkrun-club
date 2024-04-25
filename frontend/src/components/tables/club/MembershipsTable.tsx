"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../DataTable";

import { ParkrunClubMembershipType } from "@/types/ParkrunClubTypes";

import { useAtom, useAtomValue } from "jotai";
import {
    activeParkrunClubAtom,
    parkrunClubMembershipsAtom,
} from "@/atoms/atoms";
import { memberships } from "@/data/memberships";

import { useCallback, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CircleDot } from "lucide-react";
import { leaveClub } from "@/actions/club/leaveClub";

import DateFormatter from "@/components/dates/DateFormatter";

import { setActiveClub } from "@/actions/club/active/setActiveClub";

type PerformancesTableProps = {
    className?: string;
    pageSize?: number;
};

export default function MembershipsTable({
    pageSize,
    className,
}: PerformancesTableProps) {
    const [parkrunClubMemberships, setParkrunClubMemberships] = useAtom(
        parkrunClubMembershipsAtom
    );

    const [activeParkrunClub, setActiveParkrunClub] = useAtom(
        activeParkrunClubAtom
    );

    const [isPending, startTransition] = useTransition();

    const getMemberships = useCallback(() => {
        memberships()
            .then((data) => {
                setParkrunClubMemberships(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setParkrunClubMemberships]);

    useEffect(() => {
        getMemberships();
    }, [getMemberships]);

    const handleLeaveClub = (
        parkrunClubMembership: ParkrunClubMembershipType
    ) => {
        startTransition(() => {
            leaveClub(parkrunClubMembership.id).then(async (result) => {
                if (!result.success) {
                    console.log("Oh no!");
                    return;
                }

                if (
                    activeParkrunClub &&
                    activeParkrunClub.id == parkrunClubMembership.id
                ) {
                    setActiveParkrunClub(null);
                    await setActiveClub(null);
                }

                getMemberships();
            });
        });
    };

    let columns: ColumnDef<ParkrunClubMembershipType>[] = [
        {
            accessorKey: "parkrunClub.name",
            header: "Club name",
        },
        {
            accessorKey: "parkrunClub.uniqueCode",
            header: "Club Code",
        },
        {
            accessorKey: "parkrunClub.owner.name",
            header: "Club Lead",
        },
        {
            accessorKey: "parkrunClub._count.memberships",
            header: "Members",
        },
        {
            accessorKey: "createdAt",
            header: "Member Since",
            cell: ({ row }) => {
                return <DateFormatter dateString={row.original.createdAt} />;
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <Button
                        className="bg-destructive"
                        onClick={() => {
                            handleLeaveClub(row.original);
                        }}
                        disabled={isPending}
                    >
                        Leave
                    </Button>
                );
            },
        },
        {
            id: "active",
            header: "Active",
            cell: ({ row }) => {
                return activeParkrunClub &&
                    activeParkrunClub?.id == row.original.parkrunClub.id ? (
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
                data={parkrunClubMemberships}
                pageSize={pageSize}
            />
        </div>
    );
}
