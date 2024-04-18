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

import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";

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

    const activeParkrunClub = useAtomValue(activeParkrunClubAtom);

    useEffect(() => {
        console.log({ activeParkrunClub });
    }, [activeParkrunClub]);

    useEffect(() => {
        memberships()
            .then((data) => {
                setParkrunClubMemberships(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setParkrunClubMemberships]);

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
            accessorKey: "parkrunClub.id",
            header: "Members",
        },
        {
            accessorKey: "createdAt",
            header: "Member Since",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return <Button className="bg-destructive">Leave</Button>;
            },
        },
        {
            id: "active",
            header: "Active",
            cell: ({ row }) => {
                return JSON.stringify(activeParkrunClub);
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
            {JSON.stringify(activeParkrunClub)}
        </div>
    );
}
