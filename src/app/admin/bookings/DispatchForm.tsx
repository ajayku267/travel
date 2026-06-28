"use client";

import { useState } from "react";
import { assignDriverToBooking } from "./actions";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

export default function DispatchForm({ 
  bookingId, 
  drivers, 
  currentDriverId,
  currentFare
}: { 
  bookingId: string; 
  drivers: { id: string; name: string; phone: string }[];
  currentDriverId: string | null;
  currentFare: number | null;
}) {
  const [driverId, setDriverId] = useState(currentDriverId || "");
  const [totalFare, setTotalFare] = useState(currentFare ? currentFare.toString() : "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDispatch = async () => {
    if (!driverId || !totalFare) {
      toast.error("Please select a driver and enter the total fare.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await assignDriverToBooking(bookingId, driverId, parseFloat(totalFare));
      if (res?.success) {
        toast.success("Driver assigned and notified!");
      }
    } catch (e) {
      toast.error("Failed to assign driver.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentDriverId) {
    const assignedDriver = drivers.find(d => d.id === currentDriverId);
    return (
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
          <CheckCircle size={14} className="text-green-500" />
          Assigned to <strong>{assignedDriver?.name}</strong> (Fare: ₹{currentFare})
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-100 flex items-end gap-2">
      <div className="flex-1">
        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Assign Driver</label>
        <select 
          className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5"
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
        >
          <option value="">Select driver...</option>
          {drivers.map(d => (
            <option key={d.id} value={d.id}>{d.name} ({d.phone})</option>
          ))}
        </select>
      </div>
      <div className="w-24">
        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Total Fare (₹)</label>
        <input 
          type="number"
          className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5"
          placeholder="e.g. 2500"
          value={totalFare}
          onChange={(e) => setTotalFare(e.target.value)}
        />
      </div>
      <button 
        onClick={handleDispatch}
        disabled={isSubmitting || !driverId || !totalFare}
        className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg disabled:opacity-50 hover:bg-yellow-500 transition-colors"
      >
        {isSubmitting ? "..." : "Dispatch"}
      </button>
    </div>
  );
}
