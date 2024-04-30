"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTable } from "../DataTable";

import { useAtom, useAtomValue } from "jotai";
import { activeParkrunClubAtom, leaderboardDataAtom } from "@/atoms/atoms";
import { LeaderboardRowType } from "@/types/LeaderboardTypes";
import { leaderboard } from "@/data/leaderboard";
import { User } from "lucide-react";

import SortableHeader from "../elements/HeaderCell";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type PerformancesTableProps = {
    className?: string;
    pageSize?: number;
};

export default function ClubLeaderboardTable({
    pageSize,
    className,
}: PerformancesTableProps) {
    const [leaderboardData, setLeaderboardData] = useAtom(leaderboardDataAtom);
    const activeParkrunClub = useAtomValue(activeParkrunClubAtom);
    const user = useCurrentUser();
    const [isFetchingLeaderboard, setIsFetchingLeaderboard] =
        useState<boolean>(false);

    useEffect(() => {
        setIsFetchingLeaderboard(true);
        leaderboard({ parkrunClubId: activeParkrunClub?.id })
            .then((x) => {
                setLeaderboardData(x);
            })
            .catch((error) => {
                console.log("Error getting leaderboard:");
                console.log(error);
            })
            .finally(() => {
                setIsFetchingLeaderboard(false);
            });
    }, [setLeaderboardData, activeParkrunClub]);

    let columns: ColumnDef<LeaderboardRowType>[] = [
        {
            id: "avatarURL",
            header: "",
            cell: () => {
                return (
                    <div className="flex align-middle justify-center">
                        <User />
                    </div>
                );
            },
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "_count.completedParkruns",
            header: "parkruns",
        },
    ];

    const rowFormatter = (row: Row<LeaderboardRowType>): string => {
        return user && row.original.id == user.id ? "bg-green-100" : "";
    };

    return (
        <div className={className}>
            <DataTable
                columns={columns}
                data={leaderboardData || []}
                pageSize={pageSize}
                rowFormatter={rowFormatter}
                loading={isFetchingLeaderboard}
            />
        </div>
    );
}
