import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user || (session.user as any).role !== "driver") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { lat, lng } = await request.json();

    if (typeof lat !== "number" || typeof lng !== "number") {
      return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
    }

    await db.driver.update({
      where: { phone: (session.user as any).phone }, // The driver's session uses their phone as the primary identifier
      data: {
        currentLat: lat,
        currentLng: lng,
        lastLocationUpdate: new Date(),
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Location update error:", error);
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
  }
}
