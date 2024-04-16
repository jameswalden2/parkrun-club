import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/DataTable";

import { useEffect } from "react";

import { completedParkruns } from "@/data/completedParkruns";

import { useAtom } from "jotai";
import { completedParkrunsAtom } from "@/atoms/atoms";
import { CompletedParkrunType } from "@/types/CompletedParkrunsTypes";
import { Button } from "../ui/button";

type CompletedParkrunTableProps = {
    pageSize?: number;
};

export default function ParkrunCompletedTable({
    pageSize,
}: CompletedParkrunTableProps) {
    const [completedParkrunList, setCompletedParkrunList] = useAtom(
        completedParkrunsAtom
    );

    useEffect(() => {
        completedParkruns().then((x) => {
            setCompletedParkrunList(x);
        });
    }, [setCompletedParkrunList]);

    const columns: ColumnDef<CompletedParkrunType>[] = [
        {
            accessorKey: "parkrun.name",
            header: "Name",
        },
        {
            accessorKey: "noOfCompletions",
            header: "parkruns",
            cell: ({ row }) => (
                <span className="space-x-2">
                    <Button className="bg-gray-100 text-gray-400 p-2 rounded-full hover:bg-gray-200">
                        -
                    </Button>
                    <span className="font-semibold">
                        {row.getValue("noOfCompletions")}
                    </span>
                    <Button className="bg-gray-100 text-gray-400 p-2 rounded-full hover:bg-gray-200">
                        +
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={completedParkrunList}
            pageSize={pageSize}
        />
    );
}
