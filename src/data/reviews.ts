import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    location: "Charkhi Dadri",
    rating: 5,
    review:
      "Excellent service! Booked a taxi from Dadri to Delhi airport at 4 AM. Driver arrived 15 minutes early. The Tata Sumo was spotlessly clean and the driver was very professional. Reached the airport well in time. Highly recommended!",
    date: "2024-12-15",
    verified: true,
    route: "Dadri to Delhi Airport",
    featured: true,
  },
  {
    id: "2",
    name: "Priya Sharma",
    location: "Bhiwani",
    rating: 5,
    review:
      "Used Go Nainital for my wedding car rental. They provided a Chevrolet Tavera beautifully decorated. The driver was on time and very courteous. All my family members were impressed. Will definitely use again for outstation travel!",
    date: "2024-11-28",
    verified: true,
    route: "Wedding Car Rental",
    featured: true,
  },
  {
    id: "3",
    name: "Amit Tanwar",
    location: "Rohtak",
    rating: 5,
    review:
      "I use Go Nainital for my weekly commute from Rohtak to Gurgaon office. The drivers are always punctual and the cabs are well-maintained. The corporate billing is very convenient. Best taxi service in Nainital!",
    date: "2024-12-01",
    verified: true,
    route: "Rohtak to Gurgaon",
    featured: true,
  },
  {
    id: "4",
    name: "Sunita Yadav",
    location: "Hisar",
    rating: 4,
    review:
      "Booked Chevrolet Tavera for a family trip to Chandigarh. 9 people, all comfortable throughout the journey. Driver made timely stops. Only minor issue was slight delay in pickup but they informed in advance. Overall great experience!",
    date: "2024-11-20",
    verified: true,
    route: "Hisar to Chandigarh",
    featured: false,
  },
  {
    id: "5",
    name: "Deepak Malik",
    location: "Gurgaon",
    rating: 5,
    review:
      "Amazing outstation service. Traveled Gurgaon to Jaipur with family in Tata Sumo. Driver was experienced, knew the route well, and drove very safely. Highly professional. Fair pricing with no hidden charges. 5 stars!",
    date: "2024-12-10",
    verified: true,
    route: "Gurgaon to Jaipur",
    featured: true,
  },
  {
    id: "6",
    name: "Kavita Singh",
    location: "Delhi",
    rating: 5,
    review:
      "Needed last-minute cab from Delhi to Dadri at night. They arranged within 30 minutes. Driver was professional and the car was clean. The WhatsApp booking is super convenient. Excellent night service!",
    date: "2024-12-05",
    verified: true,
    route: "Delhi to Dadri",
    featured: false,
  },
  {
    id: "7",
    name: "Vikas Hooda",
    location: "Charkhi Dadri",
    rating: 5,
    review:
      "Booked Small Car for local use in Dadri for a whole day. The driver was knowledgeable about local areas and very helpful. Very reasonable daily rate. Will book again for sure!",
    date: "2024-11-15",
    verified: true,
    route: "Local Taxi Service",
    featured: false,
  },
  {
    id: "8",
    name: "Manish Goel",
    location: "Jhajjar",
    rating: 4,
    review:
      "Used their one-way taxi service from Jhajjar to Delhi multiple times. Always reliable. Good vehicle condition and experienced drivers. Fare is competitive. Customer support responds quickly on WhatsApp.",
    date: "2024-12-08",
    verified: true,
    route: "Jhajjar to Delhi",
    featured: false,
  },
];

export const featuredReviews = reviews.filter((r) => r.featured);

export const averageRating =
  reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
