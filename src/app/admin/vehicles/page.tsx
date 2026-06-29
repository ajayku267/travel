import Link from "next/link";
import { CheckCircle, Edit, Trash2, Plus, Users, Banknote } from "lucide-react";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminVehiclesPage() {
  const vehicles = await db.vehicle.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-gray-900 font-black">
              🚖
            </div>
            <div>
              <div className="font-bold">Go Nainital — Admin</div>
              <div className="text-xs text-gray-400">Vehicle Management</div>
            </div>
          </div>
          <Link href="/admin" className="text-sm text-gray-400 hover:text-white">← Dashboard</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Vehicle Fleet</h1>
            <div className="text-sm text-gray-500 mt-0.5">
              {vehicles.length} vehicles · {vehicles.filter((v) => v.popular).length} popular
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-xl text-sm hover:bg-yellow-500 transition-colors">
            <Plus size={16} /> Add Vehicle
          </button>
        </div>

        {vehicles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="text-4xl mb-3">🚗</div>
            <div className="font-bold text-gray-900 mb-1">No vehicles yet</div>
            <div className="text-sm text-gray-500">Run the seed script to populate vehicles from static data.</div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Vehicle
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Category
                    </th>
                    <th className="text-center px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Seats
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Base Fare
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Per KM
                    </th>
                    <th className="text-center px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      AC
                    </th>
                    <th className="text-center px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Popular
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-gray-900">{vehicle.name}</div>
                        <div className="text-xs text-gray-500">{vehicle.slug}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="badge badge-yellow">{vehicle.category}</span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Users size={14} className="text-gray-400" />
                          <span className="font-semibold">{vehicle.seatingCapacity}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <Banknote size={14} className="text-gray-400" />
                          <span className="font-semibold">{formatCurrency(vehicle.baseFare)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-700">
                        {formatCurrency(vehicle.pricePerKm)}/km
                      </td>
                      <td className="px-5 py-4 text-center">
                        {vehicle.hasAC ? (
                          <CheckCircle size={16} className="text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {vehicle.popular ? (
                          <span className="badge badge-yellow">⭐ Yes</span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                            <Edit size={14} />
                          </button>
                          <button className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
