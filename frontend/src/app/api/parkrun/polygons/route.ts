import { join } from "path";
import { NextResponse } from "next/server";
import { readFile } from "fs/promises";

export async function GET() {
    const filePath = join(
        process.cwd(),
        process.env.STATIC_DIR || "public",
        "parkrun/parkrun_polygons.geojson"
    );

    try {
        const data = await readFile(filePath, "utf8");
        const jsonData = JSON.parse(data);
        return NextResponse.json(jsonData);
    } catch (err) {
        return NextResponse.json({ error: "Failed to read file" });
    }
}
