import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const images = await db.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error("Fetch gallery error:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}
