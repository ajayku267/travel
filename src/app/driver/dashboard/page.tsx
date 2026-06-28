import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Phone, MapPin, CheckCircle, Navigation, Calendar } from "lucide-react";
import RideStatusButton from "./RideStatusButton";

export const dynamic = "force-dynamic";

export default async function DriverDashboard() {
  const session = await auth();
  
  if (!session?.user || (session.user as any).role !== "driver") {
    redirect("/driver/login");
  }

  const driverId = session.user.id;

  // Fetch pending and confirmed rides assigned to this driver
  const assignedRides = await db.booking.findMany({
    where: { 
      driverId,
      status: { in: ["confirmed", "pending"] }
    },
    orderBy: { createdAt: "desc" },
  });

  const completedRides = await db.booking.count({
    where: { driverId, status: "completed" }
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white px-5 py-5 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-xl">🚘</div>
            <div>
              <div className="text-gray-400 text-xs">Welcome back,</div>
              <div className="font-bold text-lg">{session.user.name}</div>
            </div>
          </div>
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/driver/login" });
          }}>
            <button className="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded-lg hover:text-white transition-colors">
              Log Out
            </button>
          </form>
        </div>
        
        <div className="flex items-center gap-4 mt-2">
          <div className="bg-gray-800 px-4 py-2.5 rounded-xl flex-1">
            <div className="text-xs text-gray-400 mb-0.5">Assigned Rides</div>
            <div className="font-bold text-xl">{assignedRides.length}</div>
          </div>
          <div className="bg-gray-800 px-4 py-2.5 rounded-xl flex-1">
            <div className="text-xs text-gray-400 mb-0.5">Completed</div>
            <div className="font-bold text-xl">{completedRides}</div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        <h2 className="font-black text-gray-900 text-lg mb-4">Your Upcoming Rides</h2>
        
        <div className="space-y-4">
          {assignedRides.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-500 border border-gray-100">
              <CheckCircle className="mx-auto mb-2 text-green-400" size={32} />
              <div className="font-semibold text-gray-900 mb-1">No pending rides!</div>
              <div className="text-sm">You have no upcoming assignments.</div>
            </div>
          ) : (
            assignedRides.map((ride) => (
              <div key={ride.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400" />
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-1">
                      {ride.date}
                    </div>
                    <div className="font-bold text-gray-900 text-lg">{ride.name}</div>
                  </div>
                  <a href={`tel:${ride.phone}`} className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg font-semibold text-sm">
                    <Phone size={14} /> Call
                  </a>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex gap-3">
                    <div className="mt-0.5"><MapPin size={16} className="text-gray-400" /></div>
                    <div>
                      <div className="text-xs text-gray-500">Pickup</div>
                      <div className="font-semibold text-sm text-gray-900">{ride.pickup}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-0.5"><Navigation size={16} className="text-gray-400" /></div>
                    <div>
                      <div className="text-xs text-gray-500">Drop</div>
                      <div className="font-semibold text-sm text-gray-900">{ride.drop}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-5 flex justify-between items-center">
                  <div>
                    <div className="text-xs text-gray-500">Collect from Customer</div>
                    <div className="font-black text-lg text-gray-900">
                      ₹{ride.totalFare ? ride.totalFare - ride.amountPaid : 0}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Advance Paid</div>
                    <div className="font-semibold text-gray-700">₹{ride.amountPaid}</div>
                  </div>
                </div>

                <RideStatusButton bookingId={ride.bookingId} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
