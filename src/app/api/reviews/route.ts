import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { publicReviewSchema, formatZodErrors } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// Public: Fetch all verified reviews
export async function GET() {
  try {
    const reviews = await db.review.findMany({
      where: { verified: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Fetch reviews error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// Public: Submit a customer review (created as unverified)
export async function POST(request: NextRequest) {
  try {
    // Rate limit: 3 reviews per minute per IP
    const ip = getClientIp(request);
    const limiter = await rateLimit(`review:${ip}`, {
      windowSeconds: 60 * 60, // 1 hour
      maxRequests: 2, // Max 2 reviews per hour per IP
    });

    if (!limiter.success) {
      return NextResponse.json(
        { success: false, message: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = publicReviewSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: formatZodErrors(result.error) },
        { status: 400 }
      );
    }

    const data = result.data;

    const review = await db.review.create({
      data: {
        name: data.name,
        location: data.location,
        rating: data.rating,
        review: data.review,
        date: new Date().toISOString().split("T")[0],
        route: data.route || null,
        verified: false,
        featured: false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your review! It will appear after verification.",
        id: review.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submit review error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit review. Please try again." },
      { status: 500 }
    );
  }
}
