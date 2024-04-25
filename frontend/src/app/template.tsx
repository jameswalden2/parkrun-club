"use client";
import { PropsWithChildren } from "react";
import Header from "@/components/Header";
import NavigationBar from "@/components/navigation/NavigationBar";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Template({ children }: PropsWithChildren) {
    const user = useCurrentUser();
    return (
        <div className="h-screen w-full flex flex-col overflow-hidden">
            <Header />
            {user && <NavigationBar />}
            <div className="flex overflow-y-auto">
                <main className="flex-1 w-full mx-auto overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
