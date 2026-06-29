import type { Metadata } from "next";
import { services } from "@/data/services";
import BookingForm from "@/components/forms/BookingForm";
import { CheckCircle, Phone } from "lucide-react";
import {
  MapPin,
  Plane,
  Navigation,
  ArrowRight,
  RefreshCw,
  Briefcase,
  Heart,
  Users,
} from "lucide-react";
import { COMPANY_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Taxi Services | ${COMPANY_NAME} — Local, Outstation, Airport, Corporate`,
  description:
    "Complete taxi services in Nainital — local cab, airport transfer, outstation taxi, one-way, round trip, corporate cab, and wedding car. Book now!",
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  MapPin,
  Plane,
  Navigation,
  ArrowRight,
  RefreshCw,
  Briefcase,
  Heart,
  Users,
};

const serviceColors = [
  "from-yellow-400 to-yellow-500",
  "from-blue-500 to-blue-600",
  "from-green-500 to-green-600",
  "from-purple-500 to-purple-600",
  "from-red-500 to-red-600",
  "from-indigo-500 to-indigo-600",
  "from-pink-500 to-pink-600",
  "from-teal-500 to-teal-600",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Comprehensive Taxi Services
            <span className="text-yellow-400 block">For Every Journey</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From quick local rides to long outstation journeys, corporate travel to wedding
            occasions — we have the right cab service for every need.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-14">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];
              const gradient = serviceColors[index % serviceColors.length];
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className="grid lg:grid-cols-2 gap-10 items-center scroll-mt-24"
                >
                  {/* Content */}
                  <div className={isEven ? "order-1" : "order-1 lg:order-2"}>
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}
                    >
                      {Icon && <Icon size={28} className="text-white" />}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <a
                        href="tel:+918392986174"
                        className="flex items-center gap-2 px-5 py-2.5 btn-primary"
                      >
                        <Phone size={16} /> Book Now
                      </a>
                      <a
                        href="https://wa.me/918392986174"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
                      >
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Visual Card */}
                  <div className={isEven ? "order-2" : "order-2 lg:order-1"}>
                    <div
                      className={`bg-gradient-to-br ${gradient} rounded-3xl p-8 shadow-xl text-white`}
                    >
                      <div className="text-5xl mb-4">
                        {
                          [
                            "🏙️",
                            "✈️",
                            "🛣️",
                            "➡️",
                            "🔄",
                            "💼",
                            "💍",
                            "👥",
                          ][index]
                        }
                      </div>
                      <h3 className="text-xl font-black mb-2">{service.title}</h3>
                      <p className="text-white/80 text-sm mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="bg-white/20 rounded-2xl p-4">
                        <div className="text-white/70 text-xs mb-2 font-semibold uppercase tracking-wide">
                          Key Features
                        </div>
                        {service.features.slice(0, 3).map((f) => (
                          <div key={f} className="flex items-center gap-2 text-sm py-1">
                            <span>✓</span> {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900">Book Any Service Now</h2>
            <p className="text-gray-500 mt-2">
              Fill the form below and we&apos;ll call you within 5 minutes.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <BookingForm compact={false} />
          </div>
        </div>
      </section>
    </>
  );
}
