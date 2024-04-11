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

import { ParkrunTableRowType } from "@/types/ParkrunTypes";

const invoices: Array<ParkrunTableRowType> = [
    {
        avatarURL: "INV001",
        name: "Jim",
        parkruns: 1,
    },
];

export function ParkrunLeaderboardTable() {
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.name}>
                        <TableCell className="font-medium">
                            {invoice.avatarURL}
                        </TableCell>
                        <TableCell>{invoice.name}</TableCell>
                        <TableCell>{invoice.parkruns}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
