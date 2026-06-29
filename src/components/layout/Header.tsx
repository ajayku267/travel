"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { COMPANY_NAME, PHONE_NUMBER } from "@/lib/utils";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Local Taxi", href: "/services#local-taxi" },
      { label: "Airport Transfer", href: "/services#airport-taxi" },
      { label: "Outstation Taxi", href: "/services#outstation-taxi" },
      { label: "Corporate Cab", href: "/services#corporate-cab" },
      { label: "Wedding Car", href: "/services#wedding-car" },
      { label: "Tempo Traveller", href: "/services#tempo-traveller" },
    ],
  },
  {
    label: "Routes",
    href: "/routes",
    children: [
      { label: "Dadri → Delhi", href: "/routes/dadri-to-delhi-taxi" },
      { label: "Dadri → Gurgaon", href: "/routes/dadri-to-gurgaon-taxi" },
      { label: "Dadri → Chandigarh", href: "/routes/dadri-to-chandigarh-taxi" },
      { label: "Bhiwani → Delhi", href: "/routes/bhiwani-to-delhi-taxi" },
      { label: "Hisar → Gurgaon", href: "/routes/hisar-to-gurgaon-taxi" },
    ],
  },
  { label: "Fleet", href: "/fleet" },
  { label: "Locations", href: "/locations" },
  { label: "Fare Calculator", href: "/fare-calculator" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-yellow-100"
          : "bg-white/95 backdrop-blur-md shadow-sm"
      )}
    >
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-9">
          <span className="text-gray-400 text-xs">
            🚖 Serving Nainital, Delhi NCR &amp; Nearby States — 24/7
          </span>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-1.5 text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
          >
            <Phone size={13} />
            <span>{PHONE_NUMBER}</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-yellow-500 transition-colors">
              <span className="text-black font-black text-lg">🚖</span>
            </div>
            <div>
              <div className="font-black text-gray-900 text-lg leading-tight">{COMPANY_NAME}</div>
              <div className="text-yellow-600 text-xs font-medium leading-tight">
                Trusted Since 2010
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                {link.children ? (
                  <>
                    <button
                      className={cn(
                        "nav-link flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-all",
                        pathname.startsWith(link.href) && "text-yellow-600 bg-yellow-50"
                      )}
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.label}
                      <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                    </button>
                    <div
                      className="absolute top-full left-0 pt-1 hidden group-hover:block min-w-48"
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors"
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
                      "nav-link px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-all",
                      pathname === link.href && "text-yellow-600 bg-yellow-50"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href={`https://wa.me/919876543210?text=Hi, I need to book a taxi`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-all shadow-md"
            >
              <span>💬</span> WhatsApp
            </a>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-2 px-4 py-2 btn-primary text-sm"
            >
              <Phone size={15} /> Book Now
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="xl:hidden pb-4 border-t border-gray-100 mt-1 animate-fade-in">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.children ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === link.label ? null : link.label)
                        }
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-yellow-50 rounded-lg transition-colors"
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform",
                            openDropdown === link.label && "rotate-180"
                          )}
                        />
                      </button>
                      {openDropdown === link.label && (
                        <div className="pl-4 flex flex-col gap-0.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 rounded-lg transition-colors",
                        pathname === link.href && "text-yellow-700 bg-yellow-50"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 bg-green-500 text-white font-semibold rounded-lg text-sm"
                >
                  💬 WhatsApp
                </a>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex-1 text-center py-2.5 btn-primary text-sm"
                >
                  📞 Call Now
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
