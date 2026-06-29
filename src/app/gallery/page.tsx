import type { Metadata } from "next";
import Image from "next/image";
import { COMPANY_NAME } from "@/lib/utils";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Gallery | ${COMPANY_NAME} — Vehicles, Journeys & Destinations`,
  description:
    "Browse our gallery of well-maintained taxi fleet, customer journeys, and popular tourist destinations served by Go Nainital.",
};

const categories = ["All", "Vehicles", "Journeys", "Destinations"];

export default async function GalleryPage() {
  const galleryImages = await db.galleryImage.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4">
            Gallery
          </span>
          <h1 className="text-4xl font-black text-white mb-4">
            Our Fleet, Journeys &amp; Destinations
          </h1>
          <p className="text-gray-300 text-lg">
            See our well-maintained vehicles, happy customer journeys, and the beautiful
            destinations we serve.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter Note */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <div
                key={cat}
                className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
              >
                {cat}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group relative"
              >
                <div className="relative">
                  <Image
                    src={img.url}
                    alt={img.caption}
                    width={400}
                    height={300}
                    unoptimized
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <div className="badge bg-yellow-400/90 text-gray-900 text-xs mb-1">
                      {img.category}
                    </div>
                    <div className="font-bold text-white leading-tight">
                      {img.caption}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-3">
            Ready to Create Your Own Journey?
          </h2>
          <p className="text-gray-400 mb-6">
            Book a taxi and let us take you to your destination safely and comfortably.
          </p>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl text-lg"
          >
            📞 Book Your Taxi Now
          </a>
        </div>
      </section>
    </>
  );
}
