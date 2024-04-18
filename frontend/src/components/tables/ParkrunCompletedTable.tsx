import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/DataTable";

import { ChangeEvent, useEffect, useState } from "react";

import { completedParkruns } from "@/data/completedParkruns";

import { useAtom } from "jotai";
import { completedParkrunsAtom } from "@/atoms/atoms";
import { CompletedParkrunType } from "@/types/CompletedParkrunsTypes";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { updateCompletedParkruns } from "@/actions/completedParkruns/updateCompletedParkruns";

type CompletedParkrunTableProps = {
    pageSize?: number;
    editable?: boolean;
};

export default function ParkrunCompletedTable({
    pageSize,
    editable = false,
}: CompletedParkrunTableProps) {
    const [completedParkrunList, setCompletedParkrunList] = useAtom(
        completedParkrunsAtom
    );

    const [updatedCompletedParkrunMap, setUpdatedCompletedParkrunMap] =
        useState<Map<String, CompletedParkrunType>>(new Map());

    const [updateParkrunsResult, setUpdateParkrunsResult] =
        useState<boolean>(false);

    useEffect(() => {
        completedParkruns().then((x) => {
            setCompletedParkrunList(x);
        });
    }, [setCompletedParkrunList]);

    const handleCompletionsChange = (
        e: ChangeEvent<HTMLInputElement>,
        row: Row<CompletedParkrunType>
    ) => {
        if (!e.target.value) {
            return;
        }

        const updatedList = [...completedParkrunList];

        const newParkrunObject = {
            ...updatedList[row.index],
            noOfCompletions: Number(e.target.value),
        };

        if (updatedList[row.index]) {
            updatedList[row.index] = newParkrunObject;
        }

        setCompletedParkrunList(updatedList);

        const newMap = updatedCompletedParkrunMap.set(
            row.index.toString(),
            newParkrunObject
        );
        setUpdatedCompletedParkrunMap(newMap);
    };

    const handleSaveChanges = () => {
        updateCompletedParkruns(updatedCompletedParkrunMap).then((data) => {
            if (data.success) {
            }
        });
    };

    const columns: ColumnDef<CompletedParkrunType>[] = [
        {
            accessorKey: "parkrun.name",
            header: "Name",
        },
        {
            accessorKey: "noOfCompletions",
            header: "No. of parkruns:",
            cell: ({ row }) => (
                <span className="space-x-2" key={row.index}>
                    {!editable && (
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <span className="font-semibold">
                                    {row.getValue("noOfCompletions")}
                                </span>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="flex justify-between space-x-4">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold">
                                            {row.original.parkrun.name}
                                        </h4>
                                        <p className="text-sm">
                                            You&apos;ve covered{" "}
                                            {Number(
                                                row.getValue("noOfCompletions")
                                            ) * 5}
                                            km here.
                                        </p>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    )}
                    {editable && (
                        <Input
                            type="number"
                            value={row.getValue("noOfCompletions")}
                            onChange={(e) => handleCompletionsChange(e, row)}
                        />
                    )}
                </span>
            ),
        },
    ];

    return (
        <>
            <div>
                <DataTable
                    columns={columns}
                    data={completedParkrunList}
                    pageSize={pageSize}
                />
            </div>
            {editable && <Button className="w-full">Save</Button>}
        </>
    );
}
