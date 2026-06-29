import Link from "next/link";
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminRoutesPage() {
  const routes = await db.route.findMany({
    orderBy: { from: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Route Pages</h1>
            <div className="text-sm text-gray-500 mt-0.5">{routes.length} routes in database</div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-xl text-sm hover:bg-yellow-500 transition-colors">
            <Plus size={16} /> Add Route
          </button>
        </div>

        {routes.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="text-4xl mb-3">🗺️</div>
            <div className="font-bold text-gray-900 mb-1">No routes yet</div>
            <div className="text-sm text-gray-500">Run the seed script to populate routes from static data.</div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Route</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Distance</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Time</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Fare</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">SEO Slug</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {routes.map((route) => (
                    <tr key={route.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-gray-900">{route.from} → {route.to}</div>
                        <div className="text-xs text-gray-500">{route.fromState} → {route.toState}</div>
                      </td>
                      <td className="px-5 py-4 text-gray-700">{route.distance}</td>
                      <td className="px-5 py-4 text-gray-700">{route.travelTime}</td>
                      <td className="px-5 py-4 font-semibold text-gray-900">{route.fareEstimate}</td>
                      <td className="px-5 py-4">
                        <code className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          /{route.slug}
                        </code>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/routes/${route.slug}`}
                            target="_blank"
                            className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                          >
                            <Eye size={14} />
                          </Link>
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
