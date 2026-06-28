"use client";

import { useState } from "react";
import { markRideStatus } from "./actions";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export default function RideStatusButton({ bookingId }: { bookingId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async () => {
    if (!confirm("Are you sure you want to mark this ride as completed?")) return;
    
    setIsSubmitting(true);
    try {
      await markRideStatus(bookingId, "completed");
      toast.success("Ride marked as completed!");
    } catch (e) {
      toast.error("Failed to update status.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      onClick={handleComplete}
      disabled={isSubmitting}
      className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
    >
      <CheckCircle2 size={18} />
      {isSubmitting ? "Updating..." : "Mark as Completed"}
    </button>
  );
}
