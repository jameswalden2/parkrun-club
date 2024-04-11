import Link from "next/link";
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";

type SidebarItemProps = {
    Icon: LucideIcon;
    linkHref: string;
};

export default function SidebarItem({ Icon, linkHref }: SidebarItemProps) {
    return (
        <li className="text-center align-middle rounded-md bg-transparent">
            <Link href={linkHref}>
                <Button
                    className="m-auto w-16 h-16 p-1 group bg-opacity-75 bg-primary hover:bg-foreground hover:bg-opacity-80"
                    size="icon"
                >
                    <Icon
                        className="m-auto group-hover:text-white"
                        strokeWidth={2.25}
                    />
                </Button>
            </Link>
        </li>
    );
}
