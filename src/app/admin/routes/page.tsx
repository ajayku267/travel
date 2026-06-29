"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Check, X, MapPin } from "lucide-react";
import type { Route } from "@prisma/client";

export default function AdminRoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Route>>({
    from: "", to: "", fromState: "Nainital", toState: "",
    distance: "", travelTime: "", fareEstimate: "",
    description: "", metaTitle: "", metaDescription: "",
    keywords: "", highlights: "[]", faqs: "[]"
  });

  const fetchRoutes = async () => {
    try {
      const res = await fetch("/api/routes");
      if (res.ok) {
        const data = await res.json();
        setRoutes(data);
      }
    } catch (error) {
      toast.error("Failed to load routes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleSave = async () => {
    try {
      const method = isEditing === "new" ? "POST" : "PUT";
      const url = isEditing === "new" ? "/api/routes" : `/api/routes/${isEditing}`;
      
      const payload = {
        ...formData,
        highlights: typeof formData.highlights === 'string' ? JSON.parse(formData.highlights || "[]") : formData.highlights,
        faqs: typeof formData.faqs === 'string' ? JSON.parse(formData.faqs || "[]") : formData.faqs,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(`Route ${isEditing === "new" ? "created" : "updated"} successfully`);
        setIsEditing(null);
        fetchRoutes();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to save route");
      }
    } catch (error) {
      toast.error("An error occurred. Check JSON formatting for Arrays.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this route?")) return;
    try {
      const res = await fetch(`/api/routes/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Route deleted");
        fetchRoutes();
      }
    } catch (error) {
      toast.error("Failed to delete route");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Taxi Routes</h1>
        <button
          onClick={() => {
            setIsEditing("new");
            setFormData({
              from: "", to: "", fromState: "Nainital", toState: "",
              distance: "", travelTime: "", fareEstimate: "",
              description: "", metaTitle: "", metaDescription: "",
              keywords: "", highlights: '["Reliable Cab", "24/7 Availability"]', 
              faqs: '[{"question":"How long does it take?", "answer":"2 hours"}]'
            });
          }}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
        >
          <Plus size={18} /> Add Route
        </button>
      </div>

      {isEditing && (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-bold mb-4">{isEditing === "new" ? "Add New Route" : "Edit Route"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">From (City)</label>
              <input type="text" value={formData.from} onChange={e => setFormData({...formData, from: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To (City)</label>
              <input type="text" value={formData.to} onChange={e => setFormData({...formData, to: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">From State</label>
              <input type="text" value={formData.fromState} onChange={e => setFormData({...formData, fromState: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To State</label>
              <input type="text" value={formData.toState} onChange={e => setFormData({...formData, toState: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Distance (e.g. 150 km)</label>
              <input type="text" value={formData.distance} onChange={e => setFormData({...formData, distance: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Travel Time</label>
              <input type="text" value={formData.travelTime} onChange={e => setFormData({...formData, travelTime: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Fare Estimate</label>
              <input type="text" value={formData.fareEstimate} onChange={e => setFormData({...formData, fareEstimate: e.target.value})} className="w-full border p-2 rounded" placeholder="₹1,500 – ₹2,000" />
            </div>
            
            <div className="lg:col-span-4">
              <label className="block text-sm font-medium mb-1">Description (for landing page & SEO)</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-2 rounded" rows={3} />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium mb-1">SEO Meta Title</label>
              <input type="text" value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium mb-1">SEO Keywords (comma separated)</label>
              <input type="text" value={formData.keywords} onChange={e => setFormData({...formData, keywords: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            
            <div className="lg:col-span-4">
              <label className="block text-sm font-medium mb-1">SEO Meta Description</label>
              <textarea value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})} className="w-full border p-2 rounded" rows={2} />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium mb-1">Highlights (JSON Array of strings)</label>
              <textarea value={typeof formData.highlights === 'string' ? formData.highlights : JSON.stringify(formData.highlights)} onChange={e => setFormData({...formData, highlights: e.target.value})} className="w-full border p-2 rounded font-mono text-xs" rows={4} placeholder='["Pick-up from doorstep", "AC Cabs"]' />
            </div>
            
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium mb-1">FAQs (JSON Array of Objects)</label>
              <textarea value={typeof formData.faqs === 'string' ? formData.faqs : JSON.stringify(formData.faqs)} onChange={e => setFormData({...formData, faqs: e.target.value})} className="w-full border p-2 rounded font-mono text-xs" rows={4} placeholder='[{"question":"...","answer":"..."}]' />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"><Check size={16}/> Save</button>
            <button onClick={() => setIsEditing(null)} className="bg-gray-200 px-4 py-2 rounded flex items-center gap-2"><X size={16}/> Cancel</button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Loading routes data...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-600">Route</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Distance & Time</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Fare</th>
                <th className="py-3 px-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map(r => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 font-medium text-gray-900">
                      <MapPin size={16} className="text-gray-400" />
                      {r.from} <span className="text-gray-400 font-normal">→</span> {r.to}
                    </div>
                    <div className="text-xs text-gray-500 ml-6">{r.slug}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">{r.distance}</div>
                    <div className="text-xs text-gray-500">{r.travelTime}</div>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">{r.fareEstimate}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => { setIsEditing(r.id); setFormData(r); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded mr-2"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(r.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {routes.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">No routes found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
