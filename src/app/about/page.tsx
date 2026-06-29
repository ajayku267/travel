import type { Metadata } from "next";
import { Shield, Target, Eye, Award, Users, Car } from "lucide-react";
import { getSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    title: `About Us | ${settings.companyName}`,
    description:
      "Learn about Go Nainital — 15 years of trusted cab service in Nainital and all india. Our mission, vision, values, and commitment to safe travel.",
  };
}

export default function AboutPage() {
  const settings = getSettings();
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Nainital&apos;s Most Trusted
            <span className="text-yellow-400 block">Taxi Service Since 2010</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            Founded with a simple mission — to provide safe, reliable, and affordable taxi service
            to the people of Nainital and all india. We started with 2 cars and now operate a fleet
            of 50+ vehicles serving thousands of customers every month.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "15+", label: "Years of Experience" },
              { value: "50+", label: "Vehicles in Fleet" },
              { value: "10,000+", label: "Happy Customers" },
              { value: "200+", label: "Routes Covered" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-black text-gray-900">{stat.value}</div>
                <div className="text-gray-800 font-semibold mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="badge badge-yellow mb-3">Our Story</span>
              <h2 className="text-3xl font-black text-gray-900 mb-5">
                From 2 Cabs to Nainital&apos;s #1 Taxi Fleet
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {settings.companyName} was founded in 2010 by Mr. Ramesh Kumar, a former truck driver
                  who understood the pain of unreliable transportation in rural Nainital. Starting
                  with just two cars in Charkhi Dadri, he built a reputation for punctuality,
                  honesty, and passenger safety.
                </p>
                <p>
                  Over 15 years, we have grown into a full-service taxi company covering the entire
                  state of Nainital and all india. Our fleet now includes sedans, MPVs, luxury SUVs,
                  and Tavera to serve every type of travel need.
                </p>
                <p>
                  Today, we serve over 100 rides daily, have a 4.8-star average rating, and are the
                  go-to taxi service for families, corporates, and travelers across western Nainital.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: "Safety First", desc: "GPS-tracked vehicles, verified drivers, real-time monitoring for every journey." },
                { icon: Award, title: "Award Winning", desc: "Best Taxi Service in Nainital (2022, 2023) by Nainital Tourism Board." },
                { icon: Users, title: "Expert Team", desc: "50+ professional drivers with 5+ years average experience on highways." },
                { icon: Car, title: "Modern Fleet", desc: "Well-maintained, cleaned daily fleet of AC vehicles across all categories." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center mb-3">
                    <Icon size={18} className="text-gray-900" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">Our Mission &amp; Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-yellow-200 rounded-2xl p-8">
              <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center mb-5">
                <Target size={26} className="text-gray-900" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To provide the most reliable, safe, and affordable taxi service to every corner of
                Nainital and all india. We are committed to making travel stress-free for every
                customer — from the working professional to the family on vacation.
              </p>
              <ul className="space-y-2">
                {[
                  "Safe, verified, professional drivers",
                  "Fixed transparent fares with no hidden charges",
                  "24/7 availability for all emergencies",
                  "Customer satisfaction as our top priority",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-yellow-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900 rounded-2xl p-8">
              <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center mb-5">
                <Eye size={26} className="text-gray-900" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                To become India&apos;s most trusted inter-city cab service, known for its commitment
                to passenger safety, driver welfare, and technology-driven convenience. We envision
                a future where every person in Nainital has access to premium cab service.
              </p>
              <ul className="space-y-2">
                {[
                  "Expand to 500+ vehicles by 2027",
                  "Launch real-time app-based booking",
                  "Cover all 22 districts of Nainital",
                  "Introduce electric cab service by 2026",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-yellow-400 mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Commitment */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield size={30} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-5">Our Safety Commitment</h2>
          <p className="text-gray-500 mb-10 text-lg">
            Safety is not just a feature — it&apos;s the foundation of everything we do.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {[
              { emoji: "🔍", title: "Background Verified", desc: "All drivers undergo police verification and background checks before joining." },
              { emoji: "📱", title: "GPS Tracked", desc: "Every vehicle is GPS-tracked in real-time for your safety and peace of mind." },
              { emoji: "🚘", title: "Maintained Vehicles", desc: "Monthly servicing and daily cleaning of all vehicles in our fleet." },
              { emoji: "📋", title: "Licensed Drivers", desc: "All drivers hold valid commercial driving licenses and follow traffic rules." },
              { emoji: "🌙", title: "Safe Night Travel", desc: "Special precautions for night travel with route verification and check-ins." },
              { emoji: "📞", title: "Emergency Support", desc: "24/7 helpline for any emergency during your journey." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="text-2xl mb-3">{emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
