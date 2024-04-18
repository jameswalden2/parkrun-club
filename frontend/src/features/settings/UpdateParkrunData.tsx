"use client";
import ParkrunCompletedTable from "@/components/tables/ParkrunCompletedTable";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { CardWrapper } from "@/components/auth/CardWrapper";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export default function UpdateParkrunData() {
    return (
        <div className="w-full flex justify-center">
            <CardWrapper
                headerTitle="Update Parkrun Data"
                headerLabel="Update the number of parkruns you've done and click Save!"
                backButtonLabel="Go to club dashboard"
                backButtonHref="/parkrunclub"
                className="w-1/2"
            >
                <ParkrunCompletedTable editable={true} />
            </CardWrapper>
        </div>
    );
}
