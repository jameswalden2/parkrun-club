"use client";
import { PropsWithChildren } from "react";

export default function Template({ children }: PropsWithChildren) {
    return <div className="flex items-center mx-auto">{children}</div>;
}
