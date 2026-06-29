import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { 
  Car, Route, MapPin, BookOpen, Star, Image, Users, 
  TrendingUp, Clock, AlertCircle, CheckCircle2
} from "lucide-react";
import AdminChart from "@/components/admin/AdminChart";

export const metadata: Metadata = {
  title: "Admin Dashboard | Go Nainital",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    totalBookings,
    pendingBookings,
    totalReviews,
    activeVehicles,
    totalRoutes,
    totalLocations,
    totalInquiries,
    recentBookings,
    bookingsLast7Days,
    inquiriesLast7Days,
    totalDrivers,
  ] = await Promise.all([
    db.booking.count(),
    db.booking.count({ where: { status: "pending" } }),
    db.review.count(),
    db.vehicle.count(),
    db.route.count(),
    db.location.count(),
    db.contactInquiry.count(),
    db.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    db.booking.findMany({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      select: { createdAt: true }
    }),
    db.contactInquiry.findMany({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true }
    }),
    db.driver.count(),
  ]);

  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0];
    const displayDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return {
      date: displayDate,
      bookings: bookingsLast7Days.filter((b: any) => b.createdAt.toISOString().startsWith(dateStr)).length,
      inquiries: inquiriesLast7Days.filter((inq: any) => inq.createdAt.toISOString().startsWith(dateStr)).length,
    };
  });

  const stats = [
    { label: "Total Bookings", value: totalBookings, change: "All time", icon: BookOpen, color: "bg-blue-500" },
    { label: "Pending Bookings", value: pendingBookings, change: "Need attention", icon: AlertCircle, color: "bg-orange-500" },
    { label: "Total Reviews", value: totalReviews, change: "Customer feedback", icon: Star, color: "bg-yellow-500" },
    { label: "Active Vehicles", value: activeVehicles, change: "In fleet", icon: Car, color: "bg-green-500" },
  ];

  const adminNavLinks = [
    { label: "Bookings", href: "/admin/bookings", icon: BookOpen, desc: "Manage taxi bookings", count: pendingBookings },
    { label: "Drivers", href: "/admin/drivers", icon: Users, desc: "Manage fleet drivers", count: totalDrivers },
    { label: "Vehicles", href: "/admin/vehicles", icon: Car, desc: "Manage vehicle fleet", count: activeVehicles },
    { label: "Routes", href: "/admin/routes", icon: Route, desc: "Manage route pages", count: totalRoutes },
    { label: "Locations", href: "/admin/locations", icon: MapPin, desc: "Manage location pages", count: totalLocations },
    { label: "Reviews", href: "/admin/reviews", icon: Star, desc: "Manage customer reviews", count: totalReviews },
    { label: "Gallery", href: "/admin/gallery", icon: Image, desc: "Manage gallery images", count: 12 },
    { label: "Inquiries", href: "/admin/inquiries", icon: Users, desc: "Contact submissions", count: totalInquiries },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-gray-900 font-black">
              🚖
            </div>
            <div>
              <div className="font-bold">Go Nainital — Admin</div>
              <div className="text-xs text-gray-400">Management Dashboard</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-white">
              ← View Website
            </Link>
            <Link href="/api/auth/signout" className="text-sm text-red-400 hover:text-red-300">
              Sign out
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map(({ label, value, change, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
                  <Icon size={18} className="text-white" />
                </div>
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                  {change}
                </span>
              </div>
              <div className="text-2xl font-black text-gray-900">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg font-black text-gray-900">Platform Analytics</h2>
              <p className="text-sm text-gray-500">Bookings vs Inquiries over the last 7 days</p>
            </div>
          </div>
          <AdminChart data={chartData} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-black text-gray-900 mb-4">Management Sections</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {adminNavLinks.map(({ label, href, icon: Icon, desc, count }) => (
                <Link
                  key={href}
                  href={href}
                  className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-yellow-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-gray-100 group-hover:bg-yellow-400 rounded-xl flex items-center justify-center transition-colors">
                      <Icon size={18} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-semibold">
                      {count}
                    </span>
                  </div>
                  <div className="font-bold text-gray-900">{label}</div>
                  <div className="text-sm text-gray-500 mt-1">{desc}</div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-gray-900">Recent Bookings</h2>
              <Link href="/admin/bookings" className="text-sm text-yellow-600 font-medium">
                View all →
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              {recentBookings.length > 0 ? recentBookings.map((booking: any, i: number) => (
                <div
                  key={booking.id}
                  className={`p-4 ${i !== recentBookings.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-semibold text-gray-900 text-sm">{booking.name}</div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        booking.status === "confirmed" || booking.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "pending"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {booking.pickup} → {booking.drop} · {booking.vehicle}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{booking.date}</div>
                </div>
              )) : (
                <div className="p-6 text-center text-gray-500 text-sm">No recent bookings.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
