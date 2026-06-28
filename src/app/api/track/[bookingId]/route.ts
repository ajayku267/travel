import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const { bookingId } = await params;
    const booking = await db.booking.findUnique({
      where: { bookingId },
      include: {
        driver: {
          select: {
            name: true,
            phone: true,
            currentLat: true,
            currentLng: true,
            lastLocationUpdate: true,
          }
        }
      }
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({
      status: booking.status,
      driver: booking.driver,
      pickup: booking.pickup,
      drop: booking.drop,
    });
  } catch (error) {
    console.error("Track API error:", error);
    return NextResponse.json({ error: "Failed to fetch tracking data" }, { status: 500 });
  }
}
