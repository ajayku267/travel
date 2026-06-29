import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing lat/lon parameters" }, { status: 400 });
  }

  try {
    // We use Photon (Komoot) instead of raw Nominatim because Nominatim frequently blocks
    // Vercel serverless IP ranges for rate-limiting.
    const res = await fetch(`https://photon.komoot.io/reverse?lon=${lon}&lat=${lat}`);

    if (!res.ok) {
      throw new Error(`Photon returned status: ${res.status}`);
    }

    const data = await res.json();

    if (!data.features || data.features.length === 0) {
      return NextResponse.json({ error: "No location found" }, { status: 404 });
    }

    const p = data.features[0].properties;
    
    // Build a display name like: "Charkhi Dadri, Haryana, India"
    const nameParts = [p.name, p.street, p.city || p.town || p.village, p.state, p.country].filter(Boolean);
    const uniqueParts = Array.from(new Set(nameParts));
    
    return NextResponse.json({
      display_name: uniqueParts.join(", ")
    });
  } catch (error) {
    console.error("Photon reverse geocode error:", error);
    return NextResponse.json({ error: "Failed to fetch location address" }, { status: 500 });
  }
}
