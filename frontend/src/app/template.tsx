"use client";
import { PropsWithChildren } from "react";
import Header from "@/components/Header";
import { Provider } from "jotai";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Template({ children }: PropsWithChildren) {
    return (
        <Provider>
            <div className="flex">
                <aside className="h-screen sticky top-0 w-24 bg-primary">
                    <Sidebar />
                </aside>
                <div className="h-screen w-full flex flex-col overflow-y-auto">
                    <Header />
                    <main className="flex h-full gap-8 w-full lg:w-[100%] mx-auto">
                        {children}
                    </main>
                </div>
            </div>
        </Provider>
    );
}
