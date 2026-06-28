import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { COMPANY_NAME, PHONE_NUMBER, EMAIL, ADDRESS } from "@/lib/utils";

const footerLinks = {
  services: [
    { label: "Local Taxi Service", href: "/services" },
    { label: "Airport Transfer", href: "/services" },
    { label: "Outstation Taxi", href: "/services" },
    { label: "Corporate Cab", href: "/services" },
    { label: "Wedding Car Rental", href: "/services" },
    { label: "Tempo Traveller", href: "/services" },
  ],
  routes: [
    { label: "Dadri to Delhi Taxi", href: "/routes/dadri-to-delhi-taxi" },
    { label: "Dadri to Gurgaon Taxi", href: "/routes/dadri-to-gurgaon-taxi" },
    { label: "Dadri to Chandigarh", href: "/routes/dadri-to-chandigarh-taxi" },
    { label: "Bhiwani to Delhi Taxi", href: "/routes/bhiwani-to-delhi-taxi" },
    { label: "Hisar to Gurgaon Taxi", href: "/routes/hisar-to-gurgaon-taxi" },
    { label: "Rohtak to Delhi Taxi", href: "/routes/rohtak-to-delhi-taxi" },
  ],
  locations: [
    { label: "Taxi in Charkhi Dadri", href: "/locations/charkhi-dadri" },
    { label: "Taxi in Bhiwani", href: "/locations/bhiwani" },
    { label: "Taxi in Rohtak", href: "/locations/rohtak" },
    { label: "Taxi in Hisar", href: "/locations/hisar" },
    { label: "Taxi in Gurgaon", href: "/locations/gurgaon" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Fleet", href: "/fleet" },
    { label: "Fare Calculator", href: "/fare-calculator" },
    { label: "Reviews", href: "/reviews" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-400/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-400/3 rounded-full blur-3xl" />

      {/* CTA Banner */}
      <div className="relative bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2Mkg2di0yaDMwem0wLTR2Mkg2di0yaDMweiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-gray-900 text-2xl font-black">Ready to Book Your Taxi?</h3>
            <p className="text-gray-800/70 text-sm mt-1">
              24/7 service — Call, WhatsApp, or Book Online
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-yellow-400 font-bold rounded-xl hover:bg-gray-800 transition-all hover:-translate-y-0.5 shadow-lg"
            >
              <Phone size={16} /> Call Now
            </a>
            <a
              href={`https://wa.me/919876543210?text=Hi, I need to book a taxi`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all hover:-translate-y-0.5 shadow-lg"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
                <span className="text-black text-lg">🚖</span>
              </div>
              <div>
                <div className="text-white font-black text-lg">{COMPANY_NAME}</div>
                <div className="text-yellow-400/80 text-xs font-medium">Trusted Since 2010</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              Haryana&#39;s most trusted taxi service operating in Haryana, Delhi NCR, and nearby
              states. Professional drivers, well-maintained vehicles, and fixed transparent pricing.
            </p>
            <div className="space-y-3">
              <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-3 group">
                <div className="w-9 h-9 bg-yellow-400/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-400 transition-colors duration-200">
                  <Phone size={14} className="text-yellow-400 group-hover:text-black transition-colors duration-200" />
                </div>
                <span className="text-sm group-hover:text-yellow-400 transition-colors">
                  {PHONE_NUMBER}
                </span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 group">
                <div className="w-9 h-9 bg-yellow-400/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-400 transition-colors duration-200">
                  <Mail size={14} className="text-yellow-400 group-hover:text-black transition-colors duration-200" />
                </div>
                <span className="text-sm group-hover:text-yellow-400 transition-colors">
                  {EMAIL}
                </span>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-yellow-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-yellow-400" />
                </div>
                <span className="text-sm text-gray-400">{ADDRESS}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-yellow-400 rounded-full" />
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-yellow-400" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Routes */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-yellow-400 rounded-full" />
              Popular Routes
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.routes.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-yellow-400" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-yellow-400 rounded-full" />
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-yellow-400" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider flex items-center gap-2 mt-8">
              <div className="w-1 h-4 bg-yellow-400 rounded-full" />
              Locations
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.locations.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-yellow-400" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">
            © {year} {COMPANY_NAME}. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-gray-500">
            <Link href="/privacy-policy" className="hover:text-yellow-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-yellow-400 transition-colors">
              Terms of Service
            </Link>
            <a href="/sitemap.xml" className="hover:text-yellow-400 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
