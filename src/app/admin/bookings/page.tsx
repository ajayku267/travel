import Link from "next/link";
import { Phone, CheckCircle, Clock, XCircle } from "lucide-react";
import { db } from "@/lib/db";
import StatusSelect from "./StatusSelect";

export const dynamic = "force-dynamic"; // Ensure fresh data on each load

const statusConfig = {
  confirmed: { label: "Confirmed", icon: CheckCircle, class: "bg-green-100 text-green-700" },
  pending: { label: "Pending", icon: Clock, class: "bg-orange-100 text-orange-700" },
  completed: { label: "Completed", icon: CheckCircle, class: "bg-blue-100 text-blue-700" },
  cancelled: { label: "Cancelled", icon: XCircle, class: "bg-red-100 text-red-700" },
};

export default async function AdminBookingsPage() {
  const bookings = await db.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-gray-900 font-black">🚖</div>
            <div>
              <div className="font-bold">Haryana Taxi — Admin</div>
              <div className="text-xs text-gray-400">Booking Management</div>
            </div>
          </div>
          <Link href="/admin" className="text-sm text-gray-400 hover:text-white">← Dashboard</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-gray-900">Bookings</h1>
          <div className="flex gap-3">
            <div className="flex gap-2">
              {Object.entries(statusConfig).map(([key, { label, class: cls }]) => (
                <span key={key} className={`badge text-xs ${cls}`}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["ID", "Customer", "Route", "Vehicle", "Date", "Type", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.length > 0 ? bookings.map((booking) => {
                  const status = statusConfig[booking.status as keyof typeof statusConfig] || statusConfig.pending;
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <code className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{booking.bookingId}</code>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-gray-900 text-sm">{booking.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Phone size={10} /> {booking.phone}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">{booking.pickup} → {booking.drop}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">{booking.vehicle}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{booking.date}</td>
                      <td className="px-4 py-4">
                        <span className="badge badge-yellow text-xs capitalize">{booking.tripType}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`badge text-xs ${status.class}`}>{status.label}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${booking.phone}`}
                            className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                          >
                            <Phone size={13} />
                          </a>
                          <StatusSelect id={booking.id} currentStatus={booking.status} />
                        </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500 text-sm">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
