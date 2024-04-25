import { Label } from "../ui/label";
type UserProfileItemProps = {
    label: string;
    info: string | number;
    className?: string;
};

export default function UserProfileItem({ label, info }: UserProfileItemProps) {
    return (
        <div className="flex items-center justify-between">
            <Label>{label}:</Label>
            <p>{String(info)}</p>
        </div>
    );
}
