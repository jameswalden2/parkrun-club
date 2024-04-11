import { db } from "@/lib/prisma";

import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    console.log("GET");
    const parkruns = await db.parkrun.findMany();
    return NextResponse.json(parkruns);
}
