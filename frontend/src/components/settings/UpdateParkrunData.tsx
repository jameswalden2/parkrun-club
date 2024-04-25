"use client";
import ParkrunCompletedTable from "@/components/tables/ParkrunCompletedTable";

import { CardWrapper } from "@/components/auth/CardWrapper";

export default function UpdateParkrunData() {
    return (
        <CardWrapper
            headerTitle="Update Parkrun Data"
            headerLabel="Update the number of parkruns you've done and click Save!"
            backButtonLabel="Go to club dashboard"
            backButtonHref="/parkrunclub"
            className="w-full"
        >
            <ParkrunCompletedTable editable forceNoClub forceDataLoad />
        </CardWrapper>
    );
}
