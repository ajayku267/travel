"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Phone, Menu, X, ChevronDown, MapPin, Plane, Car, Briefcase,
  Heart, Navigation, ArrowRight, Calculator, Users, Mail,
  Clock, Star, Shield, MessageCircle, Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/components/providers/SettingsProvider";
import LocationAutocomplete from "@/components/forms/LocationAutocomplete";

const serviceLinks = [
  { label: "Local Taxi", href: "/services#local-taxi", icon: MapPin, desc: "City rides & hourly rentals" },
  { label: "Airport Transfer", href: "/services#airport-taxi", icon: Plane, desc: "Pantnagar & Delhi airports" },
  { label: "Outstation Taxi", href: "/services#outstation-taxi", icon: Navigation, desc: "Pan-India outstation trips" },
  { label: "Corporate Cab", href: "/services#corporate-cab", icon: Briefcase, desc: "GST invoices & monthly billing" },
  { label: "Wedding Car", href: "/services#wedding-car", icon: Heart, desc: "Decorated cars for events" },
];

const routeLinks = [
  { label: "Dadri → Delhi", href: "/routes/dadri-to-delhi-taxi" },
  { label: "Dadri → Gurgaon", href: "/routes/dadri-to-gurgaon-taxi" },
  { label: "Dadri → Chandigarh", href: "/routes/dadri-to-chandigarh-taxi" },
  { label: "Bhiwani → Delhi", href: "/routes/bhiwani-to-delhi-taxi" },
  { label: "Hisar → Gurgaon", href: "/routes/hisar-to-gurgaon-taxi" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", mega: "services" },
  { label: "Routes", href: "/routes", mega: "routes" },
  { label: "Tours", href: "/tours" },
  { label: "Fleet", href: "/fleet" },
  { label: "Fare", href: "/fare-calculator" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const settings = useSettings();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [headerSearch, setHeaderSearch] = useState("");
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
    setMobileDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openMega = (key: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setActiveMega(key);
  };

  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 150);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/[0.04]"
            : "bg-white"
        )}
      >
        {/* ── Top Info Strip ───────────────────────────────────────────── */}
        <div className={cn(
          "bg-gray-900 text-white transition-all duration-300 overflow-hidden",
          scrolled ? "h-0 opacity-0" : "h-9 opacity-100"
        )}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-9">
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-xs hidden sm:flex items-center gap-1.5">
                <Clock size={11} className="text-yellow-400" />
                24/7 Available
              </span>
              <span className="text-gray-600 hidden sm:block">|</span>
              <span className="text-gray-400 text-xs flex items-center gap-1.5">
                <MapPin size={11} className="text-yellow-400" />
                Nainital & All India
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${settings.email}`}
                className="text-gray-400 text-xs hover:text-white transition-colors hidden sm:flex items-center gap-1.5"
              >
                <Mail size={11} /> {settings.email}
              </a>
              <span className="text-gray-600 hidden sm:block">|</span>
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-1.5 text-yellow-400 font-bold text-xs hover:text-yellow-300 transition-colors"
              >
                <Phone size={12} />
                <span>{settings.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Main Navigation Bar ─────────────────────────────────────── */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md shadow-yellow-400/25 group-hover:shadow-yellow-400/40 transition-all group-hover:scale-105">
                <span className="text-sm">🚖</span>
              </div>
              <div>
                <div className="font-black text-gray-900 text-base leading-tight tracking-tight">{settings.companyName}</div>
                <div className="text-[9px] font-bold text-yellow-600 uppercase tracking-[0.15em] leading-tight">
                  Trusted Since 2010
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.mega ? openMega(link.mega) : setActiveMega(null)}
                  onMouseLeave={closeMega}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-3 py-2 rounded-lg text-[13px] font-semibold transition-all flex items-center gap-1",
                      isActive(link.href)
                        ? "text-yellow-700 bg-yellow-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {link.label}
                    {link.mega && (
                      <ChevronDown
                        size={12}
                        className={cn(
                          "transition-transform duration-200",
                          activeMega === link.mega && "rotate-180"
                        )}
                      />
                    )}
                    {isActive(link.href) && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-yellow-400 rounded-full" />
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Search + CTA */}
            <div className="hidden xl:flex items-center gap-3">
              {/* Featured Search Bar */}
              <div className="relative w-64 group">
                {/* Pulsing attention dot */}
                <div className="absolute -top-1 -right-1 z-10">
                  <span className="flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                  </span>
                </div>
                <LocationAutocomplete
                  value={headerSearch}
                  onChange={setHeaderSearch}
                  onLocationSelect={(loc) => {
                    setHeaderSearch("");
                    router.push(`/fare-calculator?pickup=${encodeURIComponent(loc.name)}`);
                  }}
                  placeholder="Where to? Search any city..."
                  compact={true}
                  variant="header"
                />
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-gray-200" />

              {/* CTA Buttons */}
              <a
                href={`https://wa.me/${settings.whatsapp}?text=Hi, I need to book a taxi`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 text-xs font-bold rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <Phone size={13} /> Book Now
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={22}
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    mobileOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                  )}
                />
                <X
                  size={22}
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                  )}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Bottom border accent */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-40" />

        {/* ═══ Mega Menu: Services ═══ */}
        <div
          className={cn(
            "absolute left-0 right-0 bg-white border-t border-gray-100 shadow-2xl shadow-black/10 transition-all duration-200 origin-top hidden xl:block",
            activeMega === "services"
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-95 pointer-events-none"
          )}
          onMouseEnter={() => openMega("services")}
          onMouseLeave={closeMega}
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-7">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Our Services</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {serviceLinks.map((svc) => {
                    const Icon = svc.icon;
                    return (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-yellow-50 transition-all group"
                      >
                        <div className="w-9 h-9 bg-gray-100 group-hover:bg-yellow-400 rounded-lg flex items-center justify-center transition-colors shrink-0 mt-0.5">
                          <Icon size={16} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm group-hover:text-yellow-700 transition-colors">{svc.label}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{svc.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-5 bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-2xl p-5 border border-yellow-200/50">
                <div className="text-xs font-bold text-yellow-700 uppercase tracking-widest mb-3">Why Choose Us?</div>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: "Fixed fares with no hidden charges" },
                    { icon: Clock, text: "24/7 availability across Nainital" },
                    { icon: Star, text: "4.8★ rating from 10,000+ customers" },
                    { icon: Car, text: "Small Cars, Sumo & Tavera fleet" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5">
                      <Icon size={14} className="text-yellow-600 shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">{text}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/services"
                  className="mt-4 flex items-center gap-1.5 text-sm font-bold text-yellow-700 hover:text-yellow-800 transition-colors"
                >
                  View All Services <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Mega Menu: Routes ═══ */}
        <div
          className={cn(
            "absolute left-0 right-0 bg-white border-t border-gray-100 shadow-2xl shadow-black/10 transition-all duration-200 origin-top hidden xl:block",
            activeMega === "routes"
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-95 pointer-events-none"
          )}
          onMouseEnter={() => openMega("routes")}
          onMouseLeave={closeMega}
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-7">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Popular Routes</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {routeLinks.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-yellow-50 transition-all group"
                    >
                      <div className="w-9 h-9 bg-gray-100 group-hover:bg-yellow-400 rounded-lg flex items-center justify-center transition-colors shrink-0">
                        <Navigation size={16} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
                      </div>
                      <div className="font-bold text-gray-900 text-sm group-hover:text-yellow-700 transition-colors">{route.label}</div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="col-span-5 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-200/50">
                <div className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">Fare Calculator</div>
                <p className="text-sm text-gray-600 mb-4">
                  Instantly calculate the fare for your trip. No hidden charges, transparent pricing.
                </p>
                <Link
                  href="/fare-calculator"
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all w-fit shadow-md"
                >
                  <Calculator size={15} /> Calculate Fare
                </Link>
                <Link
                  href="/routes"
                  className="mt-3 flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors"
                >
                  View All Routes <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ Mobile Full-Screen Menu ═══ */}
      <div
        className={cn(
          "fixed inset-0 z-40 xl:hidden transition-all duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 flex flex-col",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-sm">🚖</span>
              </div>
              <span className="font-black text-gray-900">{settings.companyName}</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile search */}
          <div className="px-4 py-3 border-b border-gray-100">
            <LocationAutocomplete
              value={headerSearch}
              onChange={setHeaderSearch}
              onLocationSelect={(loc) => {
                setHeaderSearch("");
                setMobileOpen(false);
                router.push(`/fare-calculator?pickup=${encodeURIComponent(loc.name)}`);
              }}
              placeholder="Search any place..."
              compact={true}
              variant="header"
            />
          </div>

          {/* Scrollable nav */}
          <div className="flex-1 overflow-y-auto py-3">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.mega ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileDropdown(mobileDropdown === link.mega ? null : link.mega!)
                      }
                      className={cn(
                        "w-full flex items-center justify-between px-5 py-3 text-sm font-semibold transition-colors",
                        isActive(link.href) ? "text-yellow-700 bg-yellow-50" : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform duration-200",
                          mobileDropdown === link.mega && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200",
                        mobileDropdown === link.mega ? "max-h-96" : "max-h-0"
                      )}
                    >
                      <div className="bg-gray-50 py-1">
                        {(link.mega === "services" ? serviceLinks : routeLinks).map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-8 py-2.5 text-sm text-gray-600 hover:text-yellow-700 hover:bg-yellow-50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-5 py-3 text-sm font-semibold transition-colors",
                      isActive(link.href) ? "text-yellow-700 bg-yellow-50" : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile CTA buttons */}
          <div className="p-4 border-t border-gray-100 space-y-2.5 bg-gray-50">
            <a
              href={`https://wa.me/${settings.whatsapp}?text=Hi, I need to book a taxi`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white font-bold rounded-xl text-sm shadow-md"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold rounded-xl text-sm shadow-md"
            >
              <Phone size={16} /> Call & Book Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
