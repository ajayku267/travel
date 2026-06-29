import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "1",
    slug: "local-taxi",
    title: "Local Taxi Service",
    description:
      "Reliable local taxi service within Nainital and surrounding areas. Available for hourly booking, market visits, hospital trips, and more. Our local cabs are always ready to pick you up.",
    icon: "MapPin",
    features: [
      "Within city cab service",
      "Hourly/daily package available",
      "Hospital & emergency pickups",
      "Market & shopping trips",
      "Sightseeing pickups",
      "24/7 availability",
    ],
  },
  {
    id: "2",
    slug: "airport-taxi",
    title: "Airport Taxi Service",
    description:
      "Never miss a flight again. Our punctual airport transfer service ensures you reach Pantnagar Airport, Delhi IGI, or any other airport on time.",
    icon: "Plane",
    features: [
      "Pantnagar Airport transfer",
      "Delhi IGI Airport transfer",
      "Flight tracking & wait service",
      "Meet & greet at arrival",
      "Pre-booked airport rides",
      "Reliable pickups",
    ],
  },
  {
    id: "3",
    slug: "outstation-taxi",
    title: "Outstation Taxi Service",
    description:
      "Travel across North India comfortably with our outstation cab service. Whether it's Delhi, Chandigarh, Jaipur, or anywhere else — our experienced drivers know the route.",
    icon: "Navigation",
    features: [
      "Pan-India outstation service",
      "Experienced highway drivers",
      "All-inclusive fare (tolls, taxes)",
      "Small Cars, Sumo & Tavera",
      "Overnight trips available",
      "Real-time driver tracking",
    ],
  },
  {
    id: "4",
    slug: "one-way-taxi",
    title: "One Way Taxi Service",
    description:
      "Only pay for the distance you travel. Our one-way taxi service is perfect for single-direction journeys without paying for the return trip.",
    icon: "ArrowRight",
    features: [
      "Pay only for one direction",
      "Most economical option",
      "Available on all major routes",
      "No return charges",
      "Fixed one-way pricing",
      "Same quality service",
    ],
  },
  {
    id: "5",
    slug: "round-trip-taxi",
    title: "Round Trip Taxi Service",
    description:
      "Book a cab for your full round trip at discounted rates. Your driver waits for you at the destination or you can schedule a return pickup at your convenience.",
    icon: "RefreshCw",
    features: [
      "Driver waits at destination",
      "Round-trip discount pricing",
      "Flexible return time",
      "Multi-stop journeys allowed",
      "No extra waiting charges",
      "Best for day trips",
    ],
  },
  {
    id: "6",
    slug: "corporate-cab",
    title: "Corporate Cab Service",
    description:
      "Enhance your corporate travel experience with our professional cab service. We offer monthly billing, GST invoices, and dedicated account managers for businesses.",
    icon: "Briefcase",
    features: [
      "GST invoice provided",
      "Monthly billing available",
      "Dedicated account manager",
      "Employee transportation",
      "Priority booking for corporates",
      "Well-maintained vehicles",
    ],
  },
  {
    id: "7",
    slug: "wedding-car",
    title: "Wedding Car Rental",
    description:
      "Make your special day even more memorable with our reliably decorated wedding cars. Sumo and Tavera available for baraat and guest transport.",
    icon: "Heart",
    features: [
      "Decorated vehicles available",
      "Spacious Sumo & Tavera",
      "Reliable punctual service",
      "Multi-vehicle fleet for baraat",
      "Driver in formal attire",
      "Affordable wedding packages",
    ],
  },
];
