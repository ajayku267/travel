"use client";

import { useState } from "react";
import { X, Loader2, CheckCircle, Car } from "lucide-react";
import { toast } from "sonner";
import { TourPackage } from "@/data/tours";

interface TourBookingModalProps {
  tour: TourPackage;
  onClose: () => void;
}

export default function TourBookingModal({ tour, onClose }: TourBookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "Small Cars",
    journeyDate: "",
    pickupLocation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim().length < 2 || formData.phone.trim().length < 10) {
      toast.error("Please provide valid name and phone number.");
      return;
    }
    if (!formData.journeyDate || !formData.pickupLocation) {
      toast.error("Please provide a journey date and pickup location.");
      return;
    }

    setIsSubmitting(true);

    let price = "";
    if (formData.vehicle === "Small Cars") price = tour.prices.smallCars.toString();
    else if (formData.vehicle === "Sumo") price = tour.prices.sumo.toString();
    else if (formData.vehicle === "Tavera") price = tour.prices.tavera.toString();

    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      pickupLocation: formData.pickupLocation,
      dropLocation: `Tour: ${tour.name}`,
      journeyDate: formData.journeyDate,
      vehicleType: `${formData.vehicle} (₹${price})`,
      tripType: "round-trip",
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Booking request sent successfully!");
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to submit booking.");
      }
    } catch {
      toast.error("Failed to connect. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div>
            <h2 className="text-xl font-black text-gray-900">Book Tour</h2>
            <p className="text-sm text-gray-500 font-medium">{tour.name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle size={64} className="text-green-500 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-6 max-w-sm">
                Your tour booking for <strong>{tour.name}</strong> has been successfully submitted. Our team will contact you shortly to arrange the pickup.
              </p>
              <button onClick={onClose} className="btn-primary py-2.5 px-8">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100">
                <span className="text-xs font-bold text-yellow-800 uppercase tracking-wider block mb-2">Tour Summary</span>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  <strong>Covers:</strong> {tour.covers}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                    <div className="text-[10px] font-bold text-gray-500">SMALL CARS</div>
                    <div className="text-sm font-black text-gray-900">₹{tour.prices.smallCars}</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                    <div className="text-[10px] font-bold text-gray-500">SUMO</div>
                    <div className="text-sm font-black text-gray-900">₹{tour.prices.sumo}</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                    <div className="text-[10px] font-bold text-gray-500">TAVERA</div>
                    <div className="text-sm font-black text-gray-900">₹{tour.prices.tavera}</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Vehicle *</label>
                <select
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="Small Cars">Small Cars (₹{tour.prices.smallCars})</option>
                  <option value="Sumo">Sumo (₹{tour.prices.sumo})</option>
                  <option value="Tavera">Tavera (₹{tour.prices.tavera})</option>
                </select>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Journey Date *</label>
                  <input
                    name="journeyDate"
                    type="date"
                    min={minDate}
                    value={formData.journeyDate}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pickup Location/Hotel *</label>
                  <input
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="e.g. Hotel Basera, Mallital"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 83929 86174"
                    type="tel"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address (optional)</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="form-input"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3.5 text-base flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <><Loader2 size={18} className="animate-spin" /> Submitting...</>
                ) : (
                  <>Submit Booking Request</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
