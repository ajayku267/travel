import BookingForm from "@/components/forms/BookingForm";
import Link from "next/link";
import { Phone, Shield, Clock, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=80)`,
        }}
      />
      <div className="hero-overlay absolute inset-0" />

      {/* Ambient glow elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Hero Text */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/30 text-yellow-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              Trusted Since 2010 · 10,000+ Happy Customers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 animate-fade-in-up stagger-1">
              Nainital&apos;s #1
              <span className="text-yellow-400 block mt-1">Taxi Service</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-lg animate-fade-in-up stagger-2">
              Reliable, affordable cab service across Nainital, Delhi NCR &amp; nearby states.
              Professional drivers · Clean vehicles · Fixed fares
            </p>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-3 mb-8 animate-fade-in-up stagger-3">
              {[
                { value: "10,000+", label: "Happy Customers", icon: Star },
                { value: "100+", label: "Daily Rides", icon: Clock },
                { value: "4.8★", label: "Google Rating", icon: Shield },
              ].map((stat) => (
                <div key={stat.label} className="text-center glass rounded-2xl p-3 hover:bg-white/10 transition-colors">
                  <stat.icon size={16} className="text-yellow-400 mx-auto mb-1.5" />
                  <div className="text-yellow-400 font-black text-lg">{stat.value}</div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick action */}
            <div className="flex flex-wrap gap-3 animate-fade-in-up stagger-4">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/30 hover:-translate-y-0.5"
              >
                <Phone size={18} /> Call Now
              </a>
              <a
                href="https://wa.me/919876543210?text=Hi, I want to book a taxi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition-all shadow-lg shadow-green-500/30 hover:-translate-y-0.5"
              >
                💬 WhatsApp
              </a>
              <Link
                href="/fare-calculator"
                className="flex items-center gap-2 px-6 py-3 glass text-white font-semibold rounded-xl hover:bg-white/15 transition-all"
              >
                💰 Check Fare
              </Link>
            </div>
          </div>

          {/* Right — Booking Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 animate-scale-in border border-gray-100">
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-sm">🚖</span>
                </div>
                <h2 className="text-xl font-black text-gray-900">Book Your Taxi</h2>
              </div>
              <p className="text-gray-500 text-sm">Fill the form — we&apos;ll call in 5 minutes</p>
            </div>
            <BookingForm compact={false} />
          </div>
        </div>

        {/* Scrolling route marquee */}
        <div className="mt-12 marquee-container">
          <div className="flex gap-3 animate-marquee w-max">
            {[
              "Dadri → Delhi",
              "Dadri → Gurgaon",
              "Bhiwani → Delhi",
              "Hisar → Gurgaon",
              "Rohtak → Delhi",
              "Dadri → Chandigarh",
              "Nainital → Jaipur",
              "NCR → Shimla",
              "Dadri → Delhi",
              "Dadri → Gurgaon",
              "Bhiwani → Delhi",
              "Hisar → Gurgaon",
              "Rohtak → Delhi",
              "Dadri → Chandigarh",
              "Nainital → Jaipur",
              "NCR → Shimla",
            ].map((route, i) => (
              <span
                key={`${route}-${i}`}
                className="px-4 py-1.5 bg-white/8 border border-white/15 text-white text-sm rounded-full font-medium whitespace-nowrap hover:bg-white/15 transition-colors"
              >
                🚖 {route}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
