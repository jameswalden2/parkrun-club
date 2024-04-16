import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";

import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const newParkrun = await db.completedParkrun.create({
        data: {
            parkrunId: body.parkrun.id,
            userId: body.user,
        },
        include: {
            parkrun: true,
        },
    });
    return NextResponse.json(newParkrun);
}

export async function DELETE(request: NextRequest) {
    console.log("DELETE");
    const body = await request.json();
    const deletedParkrun = await db.completedParkrun.delete({
        where: {
            id: body.id,
        },
    });
    return NextResponse.json(deletedParkrun);
}
