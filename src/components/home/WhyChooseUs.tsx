"use client";

import {
  Shield,
  Clock,
  Star,
  Banknote,
  UserCheck,
  PhoneCall,
  MapPin,
  Award,
} from "lucide-react";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/animations";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Our cabs are available round the clock, every day including holidays. Never be stranded.",
    color: "bg-blue-500/10 text-blue-600",
    accent: "group-hover:bg-blue-500",
  },
  {
    icon: Shield,
    title: "Safe & Verified Drivers",
    description:
      "All drivers are background-verified, licensed, and trained for professional service.",
    color: "bg-green-500/10 text-green-600",
    accent: "group-hover:bg-green-500",
  },
  {
    icon: Banknote,
    title: "Fixed Transparent Fares",
    description:
      "No surge pricing, no hidden charges. The fare you see is the fare you pay — guaranteed.",
    color: "bg-yellow-500/10 text-yellow-600",
    accent: "group-hover:bg-yellow-500",
  },
  {
    icon: Star,
    title: "4.8★ Rated Service",
    description:
      "Consistently rated 4.8+ stars by thousands of customers across Nainital and all india.",
    color: "bg-purple-500/10 text-purple-600",
    accent: "group-hover:bg-purple-500",
  },
  {
    icon: UserCheck,
    title: "Professional Drivers",
    description:
      "Experienced drivers who know the best routes, speak politely, and maintain hygiene.",
    color: "bg-red-500/10 text-red-600",
    accent: "group-hover:bg-red-500",
  },
  {
    icon: PhoneCall,
    title: "Instant Booking",
    description:
      "Book via call, WhatsApp, or online form. We confirm your booking within 5 minutes.",
    color: "bg-indigo-500/10 text-indigo-600",
    accent: "group-hover:bg-indigo-500",
  },
  {
    icon: MapPin,
    title: "Pan-India Routes",
    description:
      "From local city rides to all-India outstation trips — we cover thousands of routes.",
    color: "bg-teal-500/10 text-teal-600",
    accent: "group-hover:bg-teal-500",
  },
  {
    icon: Award,
    title: "Trusted Since 2010",
    description:
      "15+ years of experience serving customers across Nainital and the all india region.",
    color: "bg-orange-500/10 text-orange-600",
    accent: "group-hover:bg-orange-500",
  },
];

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "50+", label: "Vehicles in Fleet" },
  { value: "200+", label: "Routes Covered" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" id="why-us">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Heading */}
        <FadeIn direction="up" className="text-center mb-16">
          <span className="badge badge-yellow text-sm mb-3">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 section-title">
            Nainital&apos;s Most Trusted Taxi Service
          </h2>
          <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
            We&apos;ve been serving customers since 2010 with a commitment to safety, reliability, and
            affordability that sets us apart.
          </p>
        </FadeIn>

        {/* Grid */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={staggerItem}
              className="group bg-white rounded-2xl p-6 card-hover border border-gray-100 hover:border-yellow-200 relative overflow-hidden"
            >
              {/* Hover gradient reveal */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl ${reason.color} ${reason.accent} flex items-center justify-center mb-4 transition-colors duration-300`}>
                  <reason.icon size={22} className="group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Stats Row */}
        <StaggerContainer staggerDelay={0.1} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="stat-card group hover:-translate-y-1 transition-transform"
            >
              <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
