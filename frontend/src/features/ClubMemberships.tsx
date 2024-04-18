"use client";
import MembershipsTable from "@/components/tables/club/MembershipsTable";

export default function ClubMemberships() {
    return (
        <div className="w-full p-8 flex flex-col space-y-8">
            <h3>Club Memberships:</h3>
            <MembershipsTable />
        </div>
    );
}
