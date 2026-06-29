import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { 
  Car, Route, MapPin, BookOpen, Star, Image, Users, 
  TrendingUp, Clock, AlertCircle, CheckCircle2, DollarSign,
  MessageSquare
} from "lucide-react";
import AdminChart from "@/components/admin/AdminChart";
import { formatCurrency, formatDate } from "@/lib/utils";

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
    completedBookingsWithFare,
    recentInquiries
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
      take: 5,
    }),
    db.booking.findMany({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      select: { createdAt: true, status: true }
    }),
    db.contactInquiry.findMany({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true }
    }),
    db.driver.count(),
    db.booking.findMany({
      where: { status: "completed", totalFare: { not: null } },
      select: { totalFare: true }
    }),
    db.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    })
  ]);

  const totalRevenue = completedBookingsWithFare.reduce((acc, curr) => acc + (curr.totalFare || 0), 0);

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

  const conversionRate = totalInquiries > 0 
    ? Math.round((totalBookings / (totalInquiries + totalBookings)) * 100) 
    : 0;

  const stats = [
    { label: "Total Bookings", value: totalBookings, change: "All time", icon: BookOpen, color: "bg-blue-500" },
    { label: "Total Revenue", value: formatCurrency(totalRevenue), change: "Completed rides", icon: DollarSign, color: "bg-green-500" },
    { label: "Conversion Rate", value: `${conversionRate}%`, change: "Bookings vs Inquiries", icon: TrendingUp, color: "bg-purple-500" },
    { label: "Pending Bookings", value: pendingBookings, change: "Action required", icon: AlertCircle, color: "bg-orange-500" },
  ];

  const adminNavLinks = [
    { label: "Bookings", href: "/admin/bookings", icon: BookOpen, desc: "Manage taxi bookings", count: pendingBookings },
    { label: "Drivers", href: "/admin/drivers", icon: Users, desc: "Manage fleet drivers", count: totalDrivers },
    { label: "Vehicles", href: "/admin/vehicles", icon: Car, desc: "Manage vehicle fleet", count: activeVehicles },
    { label: "Routes", href: "/admin/routes", icon: Route, desc: "Manage route pages", count: totalRoutes },
    { label: "Locations", href: "/admin/locations", icon: MapPin, desc: "Manage location pages", count: totalLocations },
    { label: "Reviews", href: "/admin/reviews", icon: Star, desc: "Manage customer reviews", count: totalReviews },
    { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare, desc: "Contact submissions", count: totalInquiries },
  ];

  // Combine bookings and inquiries for a unified feed
  const combinedActivity = [
    ...recentBookings.map(b => ({ type: 'booking', date: new Date(b.createdAt), data: b })),
    ...recentInquiries.map(i => ({ type: 'inquiry', date: new Date(i.createdAt), data: i }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Here is what is happening with Go Nainital today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center shadow-inner`}>
                <Icon size={18} className="text-white" />
              </div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider bg-gray-50 px-2 py-1 rounded-md">
                {change}
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900">{value}</div>
            <div className="text-sm text-gray-500 font-medium">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-black text-gray-900">Platform Analytics</h2>
              <p className="text-sm text-gray-500">Bookings vs Inquiries over the last 7 days</p>
            </div>
          </div>
          <AdminChart data={chartData} />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-black text-gray-900">Quick Navigation</h2>
              <p className="text-sm text-gray-500">Jump to management sections</p>
            </div>
          </div>
          
          <div className="space-y-3 flex-1 overflow-y-auto pr-2">
            {adminNavLinks.map(({ label, href, icon: Icon, count }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-yellow-300 hover:bg-yellow-50/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-50 group-hover:bg-white rounded-lg flex items-center justify-center transition-colors shadow-sm">
                    <Icon size={16} className="text-gray-600 group-hover:text-yellow-600" />
                  </div>
                  <span className="font-bold text-gray-700 group-hover:text-gray-900 text-sm">{label}</span>
                </div>
                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-full group-hover:bg-yellow-200 group-hover:text-yellow-800 transition-colors">
                  {count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-900">Recent Activity Feed</h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {combinedActivity.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {combinedActivity.map((activity, i) => (
                <div key={`${activity.type}-${i}`} className="p-4 hover:bg-gray-50 transition-colors flex gap-4">
                  <div className="mt-1">
                    {activity.type === 'booking' ? (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shadow-sm border border-blue-200">
                        <BookOpen size={14} className="text-blue-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shadow-sm border border-purple-200">
                        <MessageSquare size={14} className="text-purple-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-bold text-gray-900 text-sm">
                        {activity.type === 'booking' 
                          ? `New Booking from ${activity.data.name}` 
                          : `New Inquiry from ${activity.data.name}`}
                      </div>
                      <div className="text-xs text-gray-400 font-medium whitespace-nowrap">
                        {formatDate(activity.date.toISOString())}
                      </div>
                    </div>
                    
                    {activity.type === 'booking' ? (
                      <div>
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium text-gray-700">{activity.data.pickup}</span> → <span className="font-medium text-gray-700">{activity.data.drop}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            activity.data.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {activity.data.status}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                            {activity.data.vehicle}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm text-gray-600 mb-2 line-clamp-1">
                          {activity.data.subject}: {activity.data.message}
                        </div>
                        <div className="flex gap-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            activity.data.responded ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {activity.data.responded ? 'Responded' : 'Needs Response'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm">No recent activity found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
