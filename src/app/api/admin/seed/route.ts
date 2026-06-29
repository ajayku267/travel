import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { vehicles } from "@/data/vehicles";
import { routes } from "@/data/routes";
import { auth } from "@/auth";

export async function POST() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Seed Vehicles
    let vehiclesCount = 0;
    for (const v of vehicles) {
      const existing = await db.vehicle.findUnique({ where: { slug: v.slug } });
      if (!existing) {
        await db.vehicle.create({
          data: {
            slug: v.slug,
            name: v.name,
            category: v.category,
            seatingCapacity: v.seatingCapacity,
            luggageCapacity: parseInt(v.luggageCapacity) || 0, // Fallback since schema expects Int but string was "2-3 bags"
            hasAC: v.hasAC,
            baseFare: v.baseFare,
            pricePerKm: v.pricePerKm,
            popular: v.popular,
            image: v.image,
            description: v.description,
            features: JSON.stringify(v.features),
          },
        });
        vehiclesCount++;
      }
    }

    // 2. Seed Routes
    let routesCount = 0;
    for (const r of routes) {
      const existing = await db.route.findUnique({ where: { slug: r.slug } });
      if (!existing) {
        await db.route.create({
          data: {
            slug: r.slug,
            from: r.from,
            to: r.to,
            fromState: r.fromState,
            toState: r.toState,
            distance: r.distance,
            travelTime: r.travelTime,
            fareEstimate: r.fareEstimate,
            description: r.description,
            metaTitle: r.metaTitle,
            metaDescription: r.metaDescription,
            keywords: r.keywords?.join(", ") || "",
            highlights: JSON.stringify(r.highlights || []),
            faqs: JSON.stringify(r.faqs || []),
          },
        });
        routesCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Seeding complete",
      inserted: {
        vehicles: vehiclesCount,
        routes: routesCount,
      },
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
