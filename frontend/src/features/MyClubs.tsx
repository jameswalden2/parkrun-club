import MyClubsTable from "@/components/tables/club/MyClubsTable";

export default function MyClubs() {
    return (
        <div className="w-full p-8 flex flex-col space-y-8">
            <h3>My Clubs:</h3>
            <MyClubsTable />
        </div>
    );
}
