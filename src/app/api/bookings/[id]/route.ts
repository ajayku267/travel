import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { sendEmail } from "@/lib/email";
import { sendStatusUpdateNotification } from "@/lib/twilio";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    
    const booking = await db.booking.update({
      where: { id },
      data: { status: body.status },
    });

    // Send notifications to the user
    const statusLabels: Record<string, string> = {
      confirmed: "Confirmed",
      completed: "Completed",
      cancelled: "Cancelled",
    };
    const label = statusLabels[booking.status] || booking.status.charAt(0).toUpperCase() + booking.status.slice(1);

    if (booking.email) {
      sendEmail({
        to: booking.email,
        subject: `Booking Status Update - ${booking.bookingId}`,
        html: `
          <h2>Booking Status Updated</h2>
          <p>Hi ${booking.name},</p>
          <p>The status of your booking (<strong>${booking.bookingId}</strong>) has been updated to: <strong>${label}</strong>.</p>
          <p>Thank you for choosing Go Nainital!</p>
        `,
      }).catch((err) => console.error("Customer status email send failed:", err));
    }

    sendStatusUpdateNotification(booking.phone, booking.name, booking.bookingId, booking.status).catch(console.error);

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.booking.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete booking error:", error);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
