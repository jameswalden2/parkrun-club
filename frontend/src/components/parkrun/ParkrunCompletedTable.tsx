import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useMemo } from "react";
import { ParkrunCompletedTableProps } from "@/types/ParkrunTypes";

export default function ParkrunCompletedTable({
    completedParkruns,
}: ParkrunCompletedTableProps) {
    const parkrunRows = useMemo(() => {
        if (!completedParkruns) {
            return (
                <TableRow>
                    <TableCell>
                        You haven&apos;t completed any parkruns
                    </TableCell>
                </TableRow>
            );
        }
        return completedParkruns.map((parkrun) => (
            <TableRow key={parkrun.id}>
                <TableCell>{parkrun.id}</TableCell>
                <TableCell>{parkrun.parkrun.name}</TableCell>
            </TableRow>
        ));
    }, [completedParkruns]);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead className="text-bold">Parkrun</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>{parkrunRows}</TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>
                        Total:{" "}
                        {completedParkruns ? completedParkruns.length : 0}
                    </TableCell>
                </TableRow>
            </TableFooter>
            <TableCaption>A list of your completed parkruns.</TableCaption>
        </Table>
    );
}
