import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import BookingForm from "@/components/forms/BookingForm";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { Clock, MapPin, Banknote, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const routes = await db.route.findMany({ select: { slug: true } });
  return routes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = await db.route.findUnique({ where: { slug } });
  if (!route) return { title: "Route Not Found" };

  const keywords: string[] = (() => {
    try { return JSON.parse(route.keywords); } catch { return []; }
  })();

  return {
    title: route.metaTitle,
    description: route.metaDescription,
    keywords,
    openGraph: {
      title: route.metaTitle,
      description: route.metaDescription,
    },
    alternates: {
      canonical: `https://nainitaltaxi.com/routes/${route.slug}`,
    },
  };
}

export default async function RoutePage({ params }: Props) {
  const { slug } = await params;
  const [route, vehicles] = await Promise.all([
    db.route.findUnique({ where: { slug } }),
    db.vehicle.findMany({ orderBy: { baseFare: "asc" } }),
  ]);

  if (!route) notFound();

  const highlights: string[] = (() => {
    try { return JSON.parse(route.highlights); } catch { return []; }
  })();

  const faqs: { question: string; answer: string }[] = (() => {
    try { return JSON.parse(route.faqs); } catch { return []; }
  })();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-yellow-400 text-sm mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/routes" className="hover:underline">Routes</Link>
            <span>/</span>
            <span className="text-gray-400">{route.from} to {route.to}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                Taxi from {route.from} to {route.to}
              </h1>
              <p className="text-gray-300 text-lg mb-6">{route.description}</p>

              {/* Route stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { icon: MapPin, value: route.distance, label: "Distance" },
                  { icon: Clock, value: route.travelTime, label: "Travel Time" },
                  { icon: Banknote, value: route.fareEstimate, label: "Est. Fare" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="glass rounded-xl p-4 text-center">
                    <Icon size={16} className="text-yellow-400 mx-auto mb-1.5" />
                    <div className="text-white font-bold text-sm leading-tight">{value}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                {highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle size={15} className="text-green-400 flex-shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Booking form */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <h2 className="text-lg font-black text-gray-900 mb-1">
                Book {route.from} → {route.to} Taxi
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                Confirm in 5 minutes. Fixed fare guaranteed.
              </p>
              <BookingForm
                compact
                defaultPickup={route.from}
                defaultDrop={route.to}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Options */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            Vehicle Options for {route.from} → {route.to}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {vehicles.map((v) => {
              const distanceNum = parseInt(route.distance);
              const estimatedFare = v.baseFare + distanceNum * v.pricePerKm;
              return (
                <div key={v.id} className="border border-gray-100 rounded-xl p-5 hover:border-yellow-300 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-gray-900">{v.name}</div>
                      <div className="text-sm text-gray-500">{v.seatingCapacity} Seats · AC</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-gray-900 text-lg">
                        {formatCurrency(estimatedFare)}
                      </div>
                      <div className="text-xs text-gray-500">est. one-way</div>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/919876543210?text=Hi! I want to book ${v.name} from ${route.from} to ${route.to}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg text-sm hover:bg-yellow-500 transition-colors"
                  >
                    Book {v.name} <ArrowRight size={14} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Book with Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-8">
            Why Book {route.from} to {route.to} Taxi with Us?
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { emoji: "🕐", title: "24/7 Service", desc: "Available any time of day, including early morning flights." },
              { emoji: "💰", title: "Fixed Fares", desc: "No surge pricing, no hidden charges. Fixed fare quoted upfront." },
              { emoji: "🔒", title: "Verified Drivers", desc: "Police verified, licensed, and experienced drivers only." },
              { emoji: "🚘", title: "Clean AC Cabs", desc: "Well-maintained, daily cleaned AC vehicles for your comfort." },
              { emoji: "📞", title: "5-Min Confirmation", desc: "We call within 5 minutes to confirm your booking." },
              { emoji: "🗺️", title: "GPS Tracked", desc: "Real-time GPS tracking for every journey for your safety." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="text-2xl mb-2">{emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-8">
            FAQs — {route.from} to {route.to} Taxi
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-yellow-400">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-3">
            Ready to Travel from {route.from} to {route.to}?
          </h2>
          <p className="text-gray-800 mb-5">Confirmed cab in 5 minutes. Fixed fare. 24/7 service.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl"
            >
              <Phone size={16} /> Call Now
            </a>
            <a
              href={`https://wa.me/919876543210?text=Hi! I want to book taxi from ${route.from} to ${route.to}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TaxiService",
            name: `${route.from} to ${route.to} Taxi`,
            description: route.description,
            provider: {
              "@type": "LocalBusiness",
              name: "Go Nainital",
              telephone: "+919876543210",
            },
            areaServed: [route.fromState, route.toState],
          }),
        }}
      />
    </>
  );
}
