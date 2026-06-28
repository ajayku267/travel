import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import BookingForm from "@/components/forms/BookingForm";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const locations = await db.location.findMany({ select: { slug: true } });
  return locations.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = await db.location.findUnique({ where: { slug } });
  if (!location) return { title: "Location Not Found" };

  const keywords: string[] = (() => {
    try { return JSON.parse(location.keywords); } catch { return []; }
  })();

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    keywords,
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
    },
    alternates: {
      canonical: `https://haryanataxi.com/locations/${location.slug}`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = await db.location.findUnique({ where: { slug } });
  if (!location) notFound();

  // Parse JSON string fields
  const highlights: string[] = (() => {
    try { return JSON.parse(location.highlights); } catch { return []; }
  })();
  const services: string[] = (() => {
    try { return JSON.parse(location.services); } catch { return []; }
  })();
  const popularRouteSlugs: string[] = (() => {
    try { return JSON.parse(location.popularRoutes); } catch { return []; }
  })();
  const faqs: { question: string; answer: string }[] = (() => {
    try { return JSON.parse(location.faqs); } catch { return []; }
  })();

  // Fetch popular routes from DB
  const popularRouteData = popularRouteSlugs.length > 0
    ? await db.route.findMany({
        where: { slug: { in: popularRouteSlugs } },
      })
    : [];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-yellow-400 text-sm mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:underline">Locations</Link>
            <span>/</span>
            <span className="text-gray-400">{location.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="badge bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4">
                {location.state}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
                Taxi Service in {location.name}
              </h1>
              <p className="text-gray-300 text-lg mb-6">{location.description}</p>

              <div className="space-y-2 mb-6">
                {highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle size={15} className="text-green-400 flex-shrink-0" />
                    {h}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 px-5 py-2.5 bg-yellow-400 text-gray-900 font-bold rounded-xl"
                >
                  <Phone size={16} /> Call Now
                </a>
                <a
                  href={`https://wa.me/919876543210?text=Hi! I need a taxi in ${location.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white font-bold rounded-xl"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>

            {/* Booking form */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <h2 className="text-lg font-black text-gray-900 mb-1">
                Book Taxi in {location.name}
              </h2>
              <p className="text-gray-500 text-sm mb-4">We confirm within 5 minutes</p>
              <BookingForm compact defaultPickup={location.name} />
            </div>
          </div>
        </div>
      </section>

      {/* About Location */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-4">
            About {location.name} — Taxi Service
          </h2>
          <p className="text-gray-600 leading-relaxed">{location.about}</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            Available Taxi Services in {location.name}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service}
                className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 hover:border-yellow-300 hover:shadow-sm transition-all"
              >
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-sm">
                  🚖
                </div>
                <span className="font-semibold text-gray-800 text-sm">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      {popularRouteData.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              Popular Routes from {location.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularRouteData.map((route) => (
                <Link
                  key={route.id}
                  href={`/routes/${route.slug}`}
                  className="route-card rounded-xl p-5 block group"
                >
                  <div className="text-white font-bold mb-2 flex items-center gap-2">
                    {route.from}
                    <ArrowRight size={14} className="text-yellow-400" />
                    {route.to}
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{route.distance}</span>
                    <span>{route.fareEstimate}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-8">
            FAQs — Taxi Service in {location.name}
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `Taxi Service in ${location.name}`,
            description: location.description,
            areaServed: location.name,
            telephone: "+919876543210",
            address: {
              "@type": "PostalAddress",
              addressLocality: location.name,
              addressRegion: location.state,
              addressCountry: "IN",
            },
          }),
        }}
      />
    </>
  );
}
