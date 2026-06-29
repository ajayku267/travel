import Link from "next/link";
import { CheckCircle, XCircle, Plus, Users, Trash2, Power } from "lucide-react";
import { db } from "@/lib/db";
import { addDriver, deleteDriver, toggleDriverStatus } from "./actions";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function AdminDriversPage() {
  const drivers = await db.driver.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { bookings: true } } },
  });

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Drivers</h1>
            <div className="text-sm text-gray-500 mt-0.5">
              {drivers.length} total drivers in fleet
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Driver List */}
          <div className="lg:col-span-2 space-y-4">
            {drivers.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500">
                <Users className="mx-auto mb-3 opacity-30" size={48} />
                No drivers added yet.
              </div>
            ) : (
              drivers.map((driver) => (
                <div key={driver.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">{driver.name}</h3>
                      {driver.activeStatus ? (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          <CheckCircle size={12} /> Active
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          <XCircle size={12} /> Inactive
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      📱 {driver.phone} &bull; 🪪 {driver.licenseNumber || "N/A"}
                    </div>
                    <div className="text-xs text-gray-400 mt-2 font-medium">
                      Assigned Rides: {driver._count.bookings}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <form action={async () => {
                      "use server";
                      await toggleDriverStatus(driver.id, !driver.activeStatus);
                    }}>
                      <button className="p-2 text-gray-400 hover:text-blue-500 bg-gray-50 rounded-lg transition-colors" title="Toggle Status">
                        <Power size={18} />
                      </button>
                    </form>
                    <form action={async () => {
                      "use server";
                      await deleteDriver(driver.id);
                    }}>
                      <button className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg transition-colors" title="Delete Driver">
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Driver Form */}
          <div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-6">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Plus size={18} className="text-yellow-500" /> Add New Driver
              </h2>
              <form action={addDriver} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Driver Name</label>
                  <input name="name" required className="w-full form-input bg-gray-50 border-transparent focus:bg-white text-sm" placeholder="e.g. Ramesh Kumar" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Mobile Number (Login ID)</label>
                  <input name="phone" required className="w-full form-input bg-gray-50 border-transparent focus:bg-white text-sm" placeholder="e.g. 8392986174" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
                  <input name="password" required type="password" className="w-full form-input bg-gray-50 border-transparent focus:bg-white text-sm" placeholder="e.g. secret123" />
                  <p className="text-[10px] text-gray-400 mt-1">Driver will use phone + password to login</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">License Number (Optional)</label>
                  <input name="licenseNumber" className="w-full form-input bg-gray-50 border-transparent focus:bg-white text-sm" placeholder="e.g. HR..." />
                </div>
                <button type="submit" className="w-full btn-primary py-2.5 text-sm mt-2">
                  Create Driver Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
