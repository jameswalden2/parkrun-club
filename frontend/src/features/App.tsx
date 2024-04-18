"use client";
import { Provider } from "jotai";
import { PropsWithChildren } from "react";

export default function App({ children }: PropsWithChildren) {
    return (
        <>
            <Provider>{children}</Provider>
        </>
    );
}
