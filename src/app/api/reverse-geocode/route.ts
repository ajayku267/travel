import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing lat/lon parameters" }, { status: 400 });
  }

  try {
    // OpenStreetMap Nominatim reverse geocoding API
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`,
      {
        headers: {
          "User-Agent": "NainitalTaxiService/1.0 (contact@nainitaltaxi.com)",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Nominatim returned status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Nominatim reverse geocode error:", error);
    return NextResponse.json({ error: "Failed to fetch location address" }, { status: 500 });
  }
}
