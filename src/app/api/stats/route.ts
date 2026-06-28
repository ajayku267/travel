import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      totalReviews,
      activeVehicles,
      totalRoutes,
      totalLocations,
      totalInquiries,
      unresolvedInquiries,
      totalGalleryImages,
      reviews,
    ] = await Promise.all([
      db.booking.count(),
      db.booking.count({ where: { status: "pending" } }),
      db.booking.count({ where: { status: "confirmed" } }),
      db.booking.count({ where: { status: "completed" } }),
      db.booking.count({ where: { status: "cancelled" } }),
      db.review.count(),
      db.vehicle.count(),
      db.route.count(),
      db.location.count(),
      db.contactInquiry.count(),
      db.contactInquiry.count({ where: { responded: false } }),
      db.galleryImage.count(),
      db.review.findMany({ select: { rating: true } }),
    ]);

    const avgRating =
      reviews.length > 0
        ? Math.round(
            (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) *
              10
          ) / 10
        : 0;

    return NextResponse.json({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      totalReviews,
      avgRating,
      activeVehicles,
      totalRoutes,
      totalLocations,
      totalInquiries,
      unresolvedInquiries,
      totalGalleryImages,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
