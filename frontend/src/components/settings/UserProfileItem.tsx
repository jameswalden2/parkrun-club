import { Label } from "../ui/label";
type UserProfileItemProps = {
    label: string;
    info?: string | number;
    className?: string;
};

export default function UserProfileItem({ label, info }: UserProfileItemProps) {
    return (
        <div className="flex items-center justify-between">
            <Label>{label}:</Label>
            {info && <p>{String(info)}</p>}
            {!info && <p>No data available</p>}
        </div>
    );
}
