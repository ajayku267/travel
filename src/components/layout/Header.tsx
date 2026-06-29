"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Phone, Menu, X, ChevronDown, Car, Plane, Briefcase, 
  Heart, Map, MapPin, Navigation, Info, MessageSquare, 
  Calculator, PhoneCall
} from "lucide-react";
import { COMPANY_NAME, PHONE_NUMBER, WHATSAPP_NUMBER } from "@/lib/utils";
import { cn } from "@/lib/utils";

const services = [
  { label: "Local Taxi", href: "/services#local-taxi", icon: Car, desc: "City rides & sightseeing" },
  { label: "Airport Transfer", href: "/services#airport-taxi", icon: Plane, desc: "Reliable airport drops" },
  { label: "Outstation Taxi", href: "/services#outstation-taxi", icon: Map, desc: "Long distance travel" },
  { label: "Corporate Cab", href: "/services#corporate-cab", icon: Briefcase, desc: "Business travel solutions" },
  { label: "Wedding Car", href: "/services#wedding-car", icon: Heart, desc: "Luxury cars for events" },
];

const popularRoutes = [
  { label: "Dadri → Delhi", href: "/routes/dadri-to-delhi-taxi" },
  { label: "Dadri → Gurgaon", href: "/routes/dadri-to-gurgaon-taxi" },
  { label: "Dadri → Chandigarh", href: "/routes/dadri-to-chandigarh-taxi" },
  { label: "Bhiwani → Delhi", href: "/routes/bhiwani-to-delhi-taxi" },
  { label: "Hisar → Gurgaon", href: "/routes/hisar-to-gurgaon-taxi" },
];

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Fleet", href: "/fleet" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMegaMenu(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "pt-2 px-2 md:px-4" : ""
        )}
      >
        {/* Top bar - Hides on scroll */}
        <div className={cn(
          "bg-gray-900 text-white text-sm transition-all duration-300 overflow-hidden",
          scrolled ? "h-0 opacity-0" : "h-10 opacity-100"
        )}>
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
            <span className="text-gray-400 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Serving Nainital, Delhi NCR & Nearby States — 24/7 Available
            </span>
            <div className="flex items-center gap-4">
              <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-1.5 text-yellow-400 font-semibold hover:text-yellow-300 transition-colors text-xs">
                <PhoneCall size={12} /> Support: {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>

        {/* Floating Navbar Container */}
        <div className={cn(
          "mx-auto transition-all duration-500",
          scrolled ? "max-w-6xl" : "max-w-7xl"
        )}>
          <nav className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled 
              ? "bg-white/90 backdrop-blur-xl shadow-xl shadow-gray-200/50 border border-white/50 rounded-2xl h-16 px-4 md:px-6"
              : "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 h-20 px-4 md:px-6"
          )}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-black font-black text-lg">🚖</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-black text-gray-900 text-lg leading-none tracking-tight">{COMPANY_NAME}</span>
                <span className="text-yellow-600 text-[10px] font-bold uppercase tracking-wider mt-0.5">Premium Cabs</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    pathname === link.href 
                      ? "bg-gray-900 text-white shadow-md" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Services Mega Menu Trigger */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveMegaMenu('services')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                  pathname.startsWith('/services') || activeMegaMenu === 'services'
                    ? "bg-gray-900 text-white shadow-md" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}>
                  Services
                  <ChevronDown size={14} className={cn("transition-transform duration-300", activeMegaMenu === 'services' && "rotate-180")} />
                </button>
                
                {/* Services Mega Menu Panel */}
                <div className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 origin-top",
                  activeMegaMenu === 'services' ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"
                )}>
                  <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 w-[600px] grid grid-cols-2 gap-4">
                    {services.map((service) => (
                      <Link 
                        key={service.href} 
                        href={service.href}
                        className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group/item"
                      >
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 group-hover/item:bg-yellow-400 group-hover/item:text-gray-900 transition-colors shrink-0">
                          <service.icon size={18} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm mb-0.5">{service.label}</div>
                          <div className="text-xs text-gray-500">{service.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Routes Mega Menu Trigger */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveMegaMenu('routes')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                  pathname.startsWith('/routes') || activeMegaMenu === 'routes'
                    ? "bg-gray-900 text-white shadow-md" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}>
                  Routes
                  <ChevronDown size={14} className={cn("transition-transform duration-300", activeMegaMenu === 'routes' && "rotate-180")} />
                </button>
                
                {/* Routes Mega Menu Panel */}
                <div className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 origin-top",
                  activeMegaMenu === 'routes' ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"
                )}>
                  <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 w-[400px]">
                    <div className="flex items-center gap-2 mb-4 px-2">
                      <Navigation size={16} className="text-yellow-500" />
                      <h3 className="font-bold text-gray-900">Popular Destinations</h3>
                    </div>
                    <div className="grid gap-1">
                      {popularRoutes.map((route) => (
                        <Link 
                          key={route.href} 
                          href={route.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        >
                          <MapPin size={14} className="text-gray-400" />
                          {route.label}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link href="/routes" className="text-xs font-bold text-yellow-600 hover:text-yellow-700 flex items-center justify-center gap-1">
                        View All Routes <Navigation size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link href="/fare-calculator" className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors" title="Fare Calculator">
                <Calculator size={18} />
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I need to book a taxi`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-sm font-bold rounded-full hover:bg-[#20bd5a] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>💬</span> WhatsApp
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-sm font-black rounded-full hover:to-yellow-400 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Phone size={14} /> Call Now
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div className={cn(
        "fixed top-0 right-0 bottom-0 w-[85vw] max-w-[400px] bg-white z-[70] lg:hidden transition-transform duration-500 ease-out flex flex-col",
        mobileOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
      )}>
        <div className="p-5 flex items-center justify-between border-b border-gray-100">
          <div className="font-black text-xl text-gray-900">Menu</div>
          <button 
            onClick={() => setMobileOpen(false)}
            className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
          {/* Main Links */}
          <div className="space-y-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-colors",
                  pathname === link.href && "bg-yellow-50 text-yellow-700"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Services Section */}
          <div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 px-4">Our Services</div>
            <div className="space-y-1">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-colors group"
                >
                  <service.icon size={18} className="text-gray-400 group-hover:text-yellow-600 transition-colors" />
                  <span className="font-bold text-gray-700 group-hover:text-gray-900">{service.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 px-4">More</div>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/routes" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-yellow-50 text-gray-700 hover:text-yellow-700 transition-colors">
                <Navigation size={20} />
                <span className="font-bold text-sm">Routes</span>
              </Link>
              <Link href="/fare-calculator" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-yellow-50 text-gray-700 hover:text-yellow-700 transition-colors">
                <Calculator size={20} />
                <span className="font-bold text-sm">Fares</span>
              </Link>
              <Link href="/about" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-yellow-50 text-gray-700 hover:text-yellow-700 transition-colors">
                <Info size={20} />
                <span className="font-bold text-sm">About</span>
              </Link>
              <Link href="/contact" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-yellow-50 text-gray-700 hover:text-yellow-700 transition-colors">
                <MessageSquare size={20} />
                <span className="font-bold text-sm">Contact</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="p-5 bg-gray-50 border-t border-gray-100">
          <div className="grid gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white font-bold rounded-2xl shadow-sm"
            >
              <span>💬</span> WhatsApp
            </a>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white font-bold rounded-2xl shadow-sm"
            >
              <Phone size={18} /> Call {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
