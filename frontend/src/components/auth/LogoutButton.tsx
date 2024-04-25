"use client";

import { logout } from "@/actions/logout";
import { Button } from "../ui/button";
import clsx from "clsx";

interface LogoutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
    const onClick = () => {
        logout();
    };
    return (
        <Button
            onClick={onClick}
            className={clsx(
                "cursor-pointer shadow-md bg-card text-black",
                "hover:bg-slate-300",
                "hover:text-white"
            )}
        >
            {children}
        </Button>
    );
};
