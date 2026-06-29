import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
  }

  try {
    // We use Photon (Komoot) instead of raw Nominatim because Nominatim frequently blocks
    // Vercel serverless IP ranges for rate-limiting. Photon is much more lenient and uses OSM data.
    const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=5`);

    if (!res.ok) {
      throw new Error(`Photon returned status: ${res.status}`);
    }

    const data = await res.json();
    
    // Map Photon's GeoJSON format back to the Nominatim format our frontend expects
    const formattedResults = data.features.map((feature: any) => {
      const p = feature.properties;
      
      // Build a display name like: "Charkhi Dadri, Haryana, India"
      const nameParts = [p.name, p.street, p.city || p.town || p.village, p.state, p.country].filter(Boolean);
      // Remove duplicates
      const uniqueParts = Array.from(new Set(nameParts));
      
      return {
        display_name: uniqueParts.join(", "),
        lon: feature.geometry.coordinates[0].toString(),
        lat: feature.geometry.coordinates[1].toString(),
      };
    });

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error("Geocoding API error:", error);
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
  }
}
