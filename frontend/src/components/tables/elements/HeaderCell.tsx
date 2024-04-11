import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useEffect } from "react";

type SortableHeaderProps = {
    titleText: string;
    column: Column<any, unknown>;
};

export default function SortableHeader({
    titleText,
    column,
}: SortableHeaderProps) {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-2 px-4 bg-primary hover:bg-transparent"
        >
            {titleText}
            {column.getIsSorted() === "asc" || undefined ? (
                <ArrowDown className="h-4 w-4" />
            ) : (
                <ArrowUp className="h-4 w-4" />
            )}
        </Button>
    );
}
