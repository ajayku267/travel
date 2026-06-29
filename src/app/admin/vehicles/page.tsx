"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import type { Vehicle } from "@prisma/client";

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    name: "", category: "", seatingCapacity: 4, luggageCapacity: 2,
    hasAC: true, baseFare: 0, pricePerKm: 0, popular: false,
    image: "", description: "", features: "[]"
  });

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles");
      if (res.ok) {
        const data = await res.json();
        setVehicles(data);
      }
    } catch (error) {
      toast.error("Failed to load vehicles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSave = async () => {
    try {
      const method = isEditing === "new" ? "POST" : "PUT";
      const url = isEditing === "new" ? "/api/vehicles" : `/api/vehicles/${isEditing}`;
      
      const payload = {
        ...formData,
        features: typeof formData.features === 'string' ? JSON.parse(formData.features || "[]") : formData.features,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(`Vehicle ${isEditing === "new" ? "created" : "updated"} successfully`);
        setIsEditing(null);
        fetchVehicles();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to save vehicle");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      const res = await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Vehicle deleted");
        fetchVehicles();
      }
    } catch (error) {
      toast.error("Failed to delete vehicle");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vehicle Fleet Management</h1>
        <button
          onClick={() => {
            setIsEditing("new");
            setFormData({
              name: "", category: "Hatchback/Sedan", seatingCapacity: 4, luggageCapacity: 2,
              hasAC: true, baseFare: 500, pricePerKm: 12, popular: false,
              image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=80", 
              description: "", features: '["AC", "Music System"]'
            });
          }}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
        >
          <Plus size={18} /> Add Vehicle
        </button>
      </div>

      {isEditing && (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-bold mb-4">{isEditing === "new" ? "Add New Vehicle" : "Edit Vehicle"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Base Fare (₹)</label>
              <input type="number" value={formData.baseFare} onChange={e => setFormData({...formData, baseFare: Number(e.target.value)})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price per Km (₹)</label>
              <input type="number" value={formData.pricePerKm} onChange={e => setFormData({...formData, pricePerKm: Number(e.target.value)})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Seats / Luggage</label>
              <div className="flex gap-2">
                <input type="number" value={formData.seatingCapacity} onChange={e => setFormData({...formData, seatingCapacity: Number(e.target.value)})} className="w-1/2 border p-2 rounded" title="Seats" />
                <input type="number" value={formData.luggageCapacity} onChange={e => setFormData({...formData, luggageCapacity: Number(e.target.value)})} className="w-1/2 border p-2 rounded" title="Luggage" />
              </div>
            </div>
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-2 rounded" rows={3} />
            </div>
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium mb-1">Features (JSON Array)</label>
              <input type="text" value={typeof formData.features === 'string' ? formData.features : JSON.stringify(formData.features)} onChange={e => setFormData({...formData, features: e.target.value})} className="w-full border p-2 rounded" placeholder='["AC", "Music System"]' />
            </div>
            <div className="flex items-center gap-4 lg:col-span-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.hasAC} onChange={e => setFormData({...formData, hasAC: e.target.checked})} /> Has AC
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.popular} onChange={e => setFormData({...formData, popular: e.target.checked})} /> Popular Tag
              </label>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"><Check size={16}/> Save</button>
            <button onClick={() => setIsEditing(null)} className="bg-gray-200 px-4 py-2 rounded flex items-center gap-2"><X size={16}/> Cancel</button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Loading fleet data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map(v => (
            <div key={v.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              <div className="h-48 overflow-hidden">
                <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{v.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{v.category}</span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => { setIsEditing(v.id); setFormData(v); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(v.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </div>
                </div>
                <div className="text-sm text-gray-600 grid grid-cols-2 gap-2 mt-4">
                  <div>💺 {v.seatingCapacity} Seats</div>
                  <div>🧳 {v.luggageCapacity} Bags</div>
                  <div>₹ {v.baseFare} Base</div>
                  <div>₹ {v.pricePerKm}/km</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
