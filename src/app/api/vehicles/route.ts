import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const vehicles = await db.vehicle.findMany({
      orderBy: { baseFare: "asc" },
    });
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error("Fetch vehicles error:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}
