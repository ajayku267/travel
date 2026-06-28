import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { vehicles } from "../src/data/vehicles";
import { routes } from "../src/data/routes";
import { locations } from "../src/data/locations";
import { reviews } from "../src/data/reviews";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Admin User
  const password = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password,
    },
  });
  console.log("✅ Admin user created");

  // 2. Seed Vehicles
  for (const v of vehicles) {
    await prisma.vehicle.upsert({
      where: { slug: v.slug },
      update: {},
      create: {
        slug: v.slug,
        name: v.name,
        category: v.category,
        seatingCapacity: v.seatingCapacity,
        luggageCapacity: parseInt(v.luggageCapacity.toString().replace(/\D/g, '') || "2"),
        hasAC: v.hasAC,
        baseFare: v.baseFare,
        pricePerKm: v.pricePerKm,
        popular: v.popular,
        image: v.image,
        description: v.description,
        features: JSON.stringify(v.features),
      },
    });
  }
  console.log("✅ Vehicles seeded");

  // 3. Seed Routes
  for (const r of routes) {
    await prisma.route.upsert({
      where: { slug: r.slug },
      update: {},
      create: {
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
        keywords: JSON.stringify(r.keywords),
        highlights: JSON.stringify(r.highlights),
        faqs: JSON.stringify(r.faqs),
      },
    });
  }
  console.log("✅ Routes seeded");

  // 4. Seed Locations
  for (const l of locations) {
    await prisma.location.upsert({
      where: { slug: l.slug },
      update: {},
      create: {
        slug: l.slug,
        name: l.name,
        state: l.state,
        description: l.description,
        about: l.about,
        metaTitle: l.metaTitle,
        metaDescription: l.metaDescription,
        keywords: JSON.stringify(l.keywords),
        highlights: JSON.stringify(l.highlights),
        services: JSON.stringify(l.services),
        popularRoutes: JSON.stringify(l.popularRoutes),
        faqs: JSON.stringify(l.faqs),
      },
    });
  }
  console.log("✅ Locations seeded");

  // 5. Seed Reviews
  for (const rev of reviews) {
    // Reviews don't have unique slug, so just create them if none exist
    const count = await prisma.review.count();
    if (count === 0) {
      await prisma.review.create({
        data: {
          name: rev.name,
          location: rev.location,
          rating: rev.rating,
          review: rev.review,
          date: rev.date,
          verified: rev.verified,
          featured: rev.featured,
          route: rev.route,
        },
      });
    }
  }
  console.log("✅ Reviews seeded");

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
