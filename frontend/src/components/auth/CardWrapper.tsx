"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/Header";
import { BackButton } from "@/components/auth/BackButton";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    headerTitle: string;
    backButtonLabel: string;
    backButtonHref: string;
}

export const CardWrapper = ({
    children,
    headerLabel,
    headerTitle,
    backButtonLabel,
    backButtonHref,
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-m mx-auto">
            <CardHeader>
                <Header title={headerTitle} label={headerLabel} />
            </CardHeader>
            <CardContent className="space-y-4">{children}</CardContent>
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    );
};
