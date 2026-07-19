"use client";

import Link from "next/link";
import { services } from "@/data/services";
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
import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/animations";
import { motion } from "framer-motion";

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

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn direction="up" className="text-center mb-14">
          <span className="badge badge-yellow mb-3">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 section-title">
            Complete Taxi Solutions for Every Need
          </h2>
          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            Whether it&apos;s a local trip, airport transfer, outstation journey, or corporate
            commute — we have the perfect cab service for you.
          </p>
        </FadeIn>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const colors = [
              "bg-yellow-400",
              "bg-blue-500",
              "bg-green-500",
              "bg-purple-500",
              "bg-red-500",
              "bg-indigo-500",
              "bg-pink-500",
              "bg-teal-500",
            ];
            const bgColor = colors[index % colors.length];

            return (
              <motion.div key={service.id} variants={staggerItem}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group p-6 border border-gray-100 rounded-2xl hover:shadow-xl hover:border-yellow-200 transition-all card-hover block"
                >
                  <div
                    className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {Icon && <Icon size={22} className="text-white" />}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-yellow-600 text-sm font-semibold">
                    Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </StaggerContainer>

        <FadeIn direction="up" delay={0.2} className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 btn-primary"
          >
            View All Services <ArrowRight size={18} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
