import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/DataTable";

import {
    ChangeEvent,
    useCallback,
    useEffect,
    useState,
    useTransition,
} from "react";

import { useAtom, useAtomValue } from "jotai";
import {
    activeParkrunClubAtom,
    completedParkrunsAtom,
    isClubMapSelectedAtom,
    isFetchingCompletedParkrunsAtom,
} from "@/atoms/atoms";
import { CompletedParkrunType } from "@/types/CompletedParkrunsTypes";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    UpdateCompletedParkrunsResultType,
    updateCompletedParkruns,
} from "@/actions/completedParkruns/updateCompletedParkruns";
import InfoBoxWrapper from "../wrappers/InfoBoxWrapper";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { completedParkruns } from "@/data/completedParkruns";

type CompletedParkrunTableProps = {
    pageSize?: number;
    editable?: boolean;
    forceNoClub?: boolean;
    forceDataLoad?: boolean;
};

export default function ParkrunCompletedTable({
    pageSize,
    editable = false,
    forceNoClub = false,
    forceDataLoad = false,
}: CompletedParkrunTableProps) {
    const [completedParkrunList, setCompletedParkrunList] = useAtom(
        completedParkrunsAtom
    );

    const user = useCurrentUser();

    const isClubMapSelected = useAtomValue(isClubMapSelectedAtom);
    const activeParkrunClub = useAtomValue(activeParkrunClubAtom);

    const isFetchingCompletedParkruns = useAtomValue(
        isFetchingCompletedParkrunsAtom
    );

    const [isPending, startTransition] = useTransition();

    const [updatedCompletedParkrunMap, setUpdatedCompletedParkrunMap] =
        useState<Map<String, CompletedParkrunType>>(new Map());

    const [updateParkrunsResult, setUpdateParkrunsResult] =
        useState<UpdateCompletedParkrunsResultType>({
            success: false,
            completedParkruns: [],
            code: "",
        });

    useEffect(() => {
        if (forceDataLoad) {
            completedParkruns(isClubMapSelected, activeParkrunClub?.id).then(
                (data) => {
                    setCompletedParkrunList(data);
                }
            );
        }
    }, [
        isClubMapSelected,
        activeParkrunClub,
        forceDataLoad,
        setCompletedParkrunList,
    ]);

    const handleCompletionsChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>, row: Row<CompletedParkrunType>) => {
            if (!e.target.value) {
                return;
            }

            const newValue = e.target.value ? e.target.value : 1;

            const updatedList = [...completedParkrunList];

            const newParkrunObject = {
                ...updatedList[row.index],
                noOfCompletions: Number(newValue),
            };

            if (updatedList[row.index]) {
                updatedList[row.index] = newParkrunObject;
            }

            const newMap = updatedCompletedParkrunMap.set(
                row.index.toString(),
                newParkrunObject
            );
            setUpdatedCompletedParkrunMap(newMap);
        },
        [completedParkrunList, updatedCompletedParkrunMap]
    );

    const handleSaveChanges = () => {
        startTransition(() => {
            updateCompletedParkruns(updatedCompletedParkrunMap)
                .then((data) => {
                    if (data.success) {
                        setUpdateParkrunsResult(data);
                        setCompletedParkrunList(data.completedParkruns);
                    }
                })
                .catch((error) => {
                    console.log("Error updating completed parkruns:");
                    console.log(error);
                });
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
                            defaultValue={row.getValue("noOfCompletions")}
                            onChange={(e) => {
                                e.preventDefault();
                                handleCompletionsChange(e, row);
                            }}
                        />
                    )}
                </span>
            ),
        },
    ];

    const rowFormatter = (row: Row<CompletedParkrunType>): string => {
        return user && user.id == row.original.userId ? "bg-green-50" : "";
    };

    return (
        <>
            <div>
                <DataTable
                    columns={columns}
                    data={completedParkrunList || []}
                    pageSize={pageSize}
                    rowFormatter={
                        isClubMapSelected && !forceNoClub
                            ? rowFormatter
                            : undefined
                    }
                    loading={isFetchingCompletedParkruns}
                />
            </div>
            {editable && (
                <Button
                    onClick={handleSaveChanges}
                    className="w-full mt-4"
                    disabled={isPending}
                >
                    Save
                </Button>
            )}
            {updateParkrunsResult.success &&
                updateParkrunsResult.code == "success" && (
                    <InfoBoxWrapper success className="mt-4">
                        <p>Updated Successfully</p>
                    </InfoBoxWrapper>
                )}
        </>
    );
}
