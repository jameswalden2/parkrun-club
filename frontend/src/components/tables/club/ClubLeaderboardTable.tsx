"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../DataTable";

import { useAtom, useAtomValue } from "jotai";
import { activeParkrunClubAtom, leaderboardDataAtom } from "@/atoms/atoms";
import { LeaderboardRowType } from "@/types/LeaderboardTypes";
import { leaderboard } from "@/data/leaderboard";
import { User } from "lucide-react";

import SortableHeader from "../elements/HeaderCell";
import { useEffect } from "react";

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

    useEffect(() => {
        leaderboard({ parkrunClubId: activeParkrunClub?.id }).then((x) => {
            setLeaderboardData(x);
        });
    }, [setLeaderboardData, activeParkrunClub]);

    let columns: ColumnDef<LeaderboardRowType>[] = [
        {
            accessorKey: "avatarURL",
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
            accessorKey: "completedParkruns",
            header: "parkruns",
        },
    ];

    return (
        <div className={className}>
            <DataTable
                columns={columns}
                data={leaderboardData}
                pageSize={pageSize}
            />
        </div>
    );
}
