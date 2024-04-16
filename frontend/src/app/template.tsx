"use client";
import { PropsWithChildren } from "react";
import Header from "@/components/Header";
import { Provider } from "jotai";
import Sidebar from "@/components/navigation/NavigationBar";

export default function Template({ children }: PropsWithChildren) {
    return (
        <Provider>
            <div className="h-screen w-full flex flex-col overflow-hidden">
                <Header />
                <Sidebar />
                <div className="flex overflow-y-auto min-h-full">
                    <main className="flex-1 w-full mx-auto overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </Provider>
    );
}
