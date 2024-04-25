"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/Header";
import { BackButton } from "@/components/auth/BackButton";
import clsx from "clsx";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    headerTitle: string;
    backButtonLabel?: string;
    backButtonHref?: string;
    className?: string;
}

export const CardWrapper = ({
    children,
    headerLabel,
    headerTitle,
    backButtonLabel,
    backButtonHref,
    className = "w-[400px]",
}: CardWrapperProps) => {
    return (
        <Card className={clsx("shadow-m", className)}>
            <CardHeader>
                <Header title={headerTitle} label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {backButtonLabel && backButtonHref && (
                <CardFooter>
                    <BackButton label={backButtonLabel} href={backButtonHref} />
                </CardFooter>
            )}
        </Card>
    );
};
