import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { auth } from "@/auth";
import { bookingSchema, formatZodErrors } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 bookings per minute per IP
    const ip = getClientIp(request);
    const limiter = rateLimit(`booking:${ip}`, {
      windowSeconds: 60,
      maxRequests: 5,
    });

    if (!limiter.success) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate input
    const result = bookingSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: formatZodErrors(result.error) },
        { status: 400 }
      );
    }

    const data = result.data;

    const booking = await db.booking.create({
      data: {
        name: data.name,
        phone: data.phone,
        pickup: data.pickupLocation,
        drop: data.dropLocation,
        vehicle: data.vehicleType,
        date: data.journeyDate,
        tripType: data.tripType,
      },
    });

    // Send email notification (non-blocking)
    if (process.env.ADMIN_EMAIL) {
      sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Taxi Booking - ${booking.bookingId}`,
        html: `
          <h2>New Booking Details</h2>
          <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
          <p><strong>Name:</strong> ${booking.name}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Pickup:</strong> ${booking.pickup}</p>
          <p><strong>Drop:</strong> ${booking.drop}</p>
          <p><strong>Vehicle:</strong> ${booking.vehicle}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Trip Type:</strong> ${booking.tripType}</p>
        `,
      }).catch((err) => console.error("Email send failed:", err));
    }

    return NextResponse.json(
      { success: true, message: "Booking received! We will call you shortly.", id: booking.bookingId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process booking. Please call us directly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bookings = await db.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
