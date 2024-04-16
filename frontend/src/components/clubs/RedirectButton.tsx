"use client";

import clsx from "clsx";

import { Button } from "../ui/button";
import Link from "next/link";

type RedirectButtonProps = {
    redirectURL: string;
    buttonText: string;
    className?: string;
};

export default function RedirectButton({
    redirectURL,
    buttonText,
    className,
}: RedirectButtonProps) {
    return (
        <Link href={redirectURL}>
            <Button className={clsx("w-full", className)}>{buttonText}</Button>
        </Link>
    );
}
