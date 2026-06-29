import Link from "next/link";
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminLocationsPage() {
  const locations = await db.location.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-gray-900 font-black">🚖</div>
            <div>
              <div className="font-bold">Go Nainital — Admin</div>
              <div className="text-xs text-gray-400">Location Management</div>
            </div>
          </div>
          <Link href="/admin" className="text-sm text-gray-400 hover:text-white">← Dashboard</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Location Pages</h1>
            <div className="text-sm text-gray-500 mt-0.5">{locations.length} locations in database</div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-xl text-sm hover:bg-yellow-500 transition-colors">
            <Plus size={16} /> Add Location
          </button>
        </div>

        {locations.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="text-4xl mb-3">📍</div>
            <div className="font-bold text-gray-900 mb-1">No locations yet</div>
            <div className="text-sm text-gray-500">Run the seed script to populate locations from static data.</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {locations.map((loc) => {
              const services: string[] = (() => {
                try { return JSON.parse(loc.services); } catch { return []; }
              })();

              return (
                <div key={loc.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-black text-gray-900 text-lg">{loc.name}</div>
                      <div className="badge badge-yellow text-xs">{loc.state}</div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/locations/${loc.slug}`}
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
                  </div>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{loc.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {services.slice(0, 3).map((s) => (
                      <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-50 text-xs text-gray-400">
                    <code>/{loc.slug}</code>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
