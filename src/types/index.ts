export interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: string;
  seatingCapacity: number;
  hasAC: boolean;
  luggageCapacity: string;
  pricePerKm: number;
  baseFare: number;
  image: string;
  features: string[];
  description: string;
  popular?: boolean;
}

export interface Route {
  id: string;
  slug: string;
  from: string;
  to: string;
  distance: string;
  travelTime: string;
  fareEstimate: string;
  fromState: string;
  toState: string;
  description: string;
  highlights: string[];
  faqs: FAQ[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface Location {
  id: string;
  slug: string;
  name: string;
  state: string;
  description: string;
  about: string;
  popularRoutes: string[];
  services: string[];
  highlights: string[];
  faqs: FAQ[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  pickupLocation: string;
  dropLocation: string;
  journeyDate: string;
  vehicleType: string;
  tripType: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  fare?: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  date: string;
  avatar?: string;
  verified: boolean;
  route?: string;
  featured?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "vehicles" | "journeys" | "destinations" | "team";
  title?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  createdAt: string;
  responded: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image?: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email?: string;
  pickupLocation: string;
  dropLocation: string;
  journeyDate: string;
  vehicleType: string;
  tripType: string;
  message?: string;
}

export interface FareCalculation {
  pickupLocation: string;
  dropLocation: string;
  vehicleType: string;
  tripType: "one-way" | "round-trip";
  estimatedFare?: number;
  distance?: string;
}

export interface AdminStats {
  totalBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  totalReviews: number;
  avgRating: number;
  totalInquiries: number;
}
