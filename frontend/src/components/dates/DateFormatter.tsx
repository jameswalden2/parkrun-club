import { parseISO, format } from "date-fns";

type DateFormatterProps = {
    dateString: string | Date | null | undefined;
};

export default function DateFormatter({ dateString }: DateFormatterProps) {
    const date =
        typeof dateString == "string" ? parseISO(dateString) : dateString;

    return (
        <>
            {dateString && date && (
                <time
                    dateTime={
                        typeof dateString == "string"
                            ? dateString
                            : dateString.toISOString()
                    }
                >
                    {format(date, "MMMM dd, yyyy")}
                </time>
            )}
            {!dateString && <p className="text-gray">Not a Date.</p>}
        </>
    );
}
