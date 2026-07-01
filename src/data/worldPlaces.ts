export interface WorldPlace {
  name: string;
  country: string;
  type: "city" | "airport" | "landmark" | "state";
  region: string;
}

export const worldPlaces: WorldPlace[] = [
  // India — Major Cities
  { name: "New Delhi", country: "India", type: "city", region: "Asia" },
  { name: "Mumbai", country: "India", type: "city", region: "Asia" },
  { name: "Bangalore", country: "India", type: "city", region: "Asia" },
  { name: "Chennai", country: "India", type: "city", region: "Asia" },
  { name: "Kolkata", country: "India", type: "city", region: "Asia" },
  { name: "Hyderabad", country: "India", type: "city", region: "Asia" },
  { name: "Pune", country: "India", type: "city", region: "Asia" },
  { name: "Ahmedabad", country: "India", type: "city", region: "Asia" },
  { name: "Jaipur", country: "India", type: "city", region: "Asia" },
  { name: "Lucknow", country: "India", type: "city", region: "Asia" },
  { name: "Chandigarh", country: "India", type: "city", region: "Asia" },
  { name: "Gurgaon", country: "India", type: "city", region: "Asia" },
  { name: "Noida", country: "India", type: "city", region: "Asia" },
  { name: "Goa", country: "India", type: "city", region: "Asia" },
  { name: "Varanasi", country: "India", type: "city", region: "Asia" },
  { name: "Agra", country: "India", type: "city", region: "Asia" },
  { name: "Shimla", country: "India", type: "city", region: "Asia" },
  { name: "Manali", country: "India", type: "city", region: "Asia" },
  { name: "Rishikesh", country: "India", type: "city", region: "Asia" },
  { name: "Dehradun", country: "India", type: "city", region: "Asia" },
  { name: "Nainital", country: "India", type: "city", region: "Asia" },
  { name: "Mussoorie", country: "India", type: "city", region: "Asia" },
  { name: "Haridwar", country: "India", type: "city", region: "Asia" },
  { name: "Amritsar", country: "India", type: "city", region: "Asia" },
  { name: "Udaipur", country: "India", type: "city", region: "Asia" },
  { name: "Jodhpur", country: "India", type: "city", region: "Asia" },
  { name: "Srinagar", country: "India", type: "city", region: "Asia" },
  { name: "Darjeeling", country: "India", type: "city", region: "Asia" },
  { name: "Mysore", country: "India", type: "city", region: "Asia" },
  { name: "Kochi", country: "India", type: "city", region: "Asia" },
  { name: "Bhopal", country: "India", type: "city", region: "Asia" },
  { name: "Indore", country: "India", type: "city", region: "Asia" },
  { name: "Nagpur", country: "India", type: "city", region: "Asia" },
  { name: "Surat", country: "India", type: "city", region: "Asia" },
  { name: "Patna", country: "India", type: "city", region: "Asia" },
  { name: "Ranchi", country: "India", type: "city", region: "Asia" },
  { name: "Thiruvananthapuram", country: "India", type: "city", region: "Asia" },
  { name: "Coimbatore", country: "India", type: "city", region: "Asia" },
  { name: "Visakhapatnam", country: "India", type: "city", region: "Asia" },
  { name: "Rohtak", country: "India", type: "city", region: "Asia" },
  { name: "Hisar", country: "India", type: "city", region: "Asia" },
  { name: "Bhiwani", country: "India", type: "city", region: "Asia" },
  { name: "Charkhi Dadri", country: "India", type: "city", region: "Asia" },

  // India — Airports
  { name: "IGI Airport Delhi", country: "India", type: "airport", region: "Asia" },
  { name: "Pantnagar Airport", country: "India", type: "airport", region: "Asia" },
  { name: "Chhatrapati Shivaji Airport Mumbai", country: "India", type: "airport", region: "Asia" },

  // India — Landmarks
  { name: "Taj Mahal, Agra", country: "India", type: "landmark", region: "Asia" },
  { name: "Gateway of India, Mumbai", country: "India", type: "landmark", region: "Asia" },
  { name: "India Gate, Delhi", country: "India", type: "landmark", region: "Asia" },

  // Asia
  { name: "Tokyo", country: "Japan", type: "city", region: "Asia" },
  { name: "Bangkok", country: "Thailand", type: "city", region: "Asia" },
  { name: "Singapore", country: "Singapore", type: "city", region: "Asia" },
  { name: "Dubai", country: "UAE", type: "city", region: "Middle East" },
  { name: "Abu Dhabi", country: "UAE", type: "city", region: "Middle East" },
  { name: "Kuala Lumpur", country: "Malaysia", type: "city", region: "Asia" },
  { name: "Seoul", country: "South Korea", type: "city", region: "Asia" },
  { name: "Hong Kong", country: "China", type: "city", region: "Asia" },
  { name: "Shanghai", country: "China", type: "city", region: "Asia" },
  { name: "Beijing", country: "China", type: "city", region: "Asia" },
  { name: "Bali", country: "Indonesia", type: "city", region: "Asia" },
  { name: "Kathmandu", country: "Nepal", type: "city", region: "Asia" },
  { name: "Colombo", country: "Sri Lanka", type: "city", region: "Asia" },
  { name: "Dhaka", country: "Bangladesh", type: "city", region: "Asia" },
  { name: "Islamabad", country: "Pakistan", type: "city", region: "Asia" },
  { name: "Hanoi", country: "Vietnam", type: "city", region: "Asia" },

  // Europe
  { name: "London", country: "United Kingdom", type: "city", region: "Europe" },
  { name: "Paris", country: "France", type: "city", region: "Europe" },
  { name: "Rome", country: "Italy", type: "city", region: "Europe" },
  { name: "Barcelona", country: "Spain", type: "city", region: "Europe" },
  { name: "Berlin", country: "Germany", type: "city", region: "Europe" },
  { name: "Amsterdam", country: "Netherlands", type: "city", region: "Europe" },
  { name: "Zurich", country: "Switzerland", type: "city", region: "Europe" },
  { name: "Vienna", country: "Austria", type: "city", region: "Europe" },
  { name: "Prague", country: "Czech Republic", type: "city", region: "Europe" },
  { name: "Istanbul", country: "Turkey", type: "city", region: "Europe" },
  { name: "Athens", country: "Greece", type: "city", region: "Europe" },
  { name: "Moscow", country: "Russia", type: "city", region: "Europe" },
  { name: "Dublin", country: "Ireland", type: "city", region: "Europe" },
  { name: "Lisbon", country: "Portugal", type: "city", region: "Europe" },
  { name: "Stockholm", country: "Sweden", type: "city", region: "Europe" },
  { name: "Copenhagen", country: "Denmark", type: "city", region: "Europe" },

  // Americas
  { name: "New York", country: "USA", type: "city", region: "North America" },
  { name: "Los Angeles", country: "USA", type: "city", region: "North America" },
  { name: "San Francisco", country: "USA", type: "city", region: "North America" },
  { name: "Chicago", country: "USA", type: "city", region: "North America" },
  { name: "Miami", country: "USA", type: "city", region: "North America" },
  { name: "Las Vegas", country: "USA", type: "city", region: "North America" },
  { name: "Toronto", country: "Canada", type: "city", region: "North America" },
  { name: "Vancouver", country: "Canada", type: "city", region: "North America" },
  { name: "Mexico City", country: "Mexico", type: "city", region: "North America" },
  { name: "São Paulo", country: "Brazil", type: "city", region: "South America" },
  { name: "Buenos Aires", country: "Argentina", type: "city", region: "South America" },
  { name: "Lima", country: "Peru", type: "city", region: "South America" },
  { name: "Bogotá", country: "Colombia", type: "city", region: "South America" },

  // Africa
  { name: "Cairo", country: "Egypt", type: "city", region: "Africa" },
  { name: "Cape Town", country: "South Africa", type: "city", region: "Africa" },
  { name: "Nairobi", country: "Kenya", type: "city", region: "Africa" },
  { name: "Marrakech", country: "Morocco", type: "city", region: "Africa" },
  { name: "Lagos", country: "Nigeria", type: "city", region: "Africa" },

  // Oceania
  { name: "Sydney", country: "Australia", type: "city", region: "Oceania" },
  { name: "Melbourne", country: "Australia", type: "city", region: "Oceania" },
  { name: "Auckland", country: "New Zealand", type: "city", region: "Oceania" },
];

/** Popular/trending places shown as quick-select chips */
export const trendingPlaces = [
  "Delhi",
  "Nainital",
  "Gurgaon",
  "Shimla",
  "Manali",
  "Jaipur",
  "Chandigarh",
  "Agra",
  "Mumbai",
  "Dehradun",
  "Rishikesh",
  "Mussoorie",
];

/**
 * Fast client-side fuzzy search for world places.
 * Returns matching places sorted by relevance.
 */
export function searchWorldPlaces(query: string, limit = 8): WorldPlace[] {
  if (!query || query.length === 0) return [];

  const q = query.toLowerCase().trim();

  // Exact prefix match gets highest priority
  const prefixMatches: WorldPlace[] = [];
  const containsMatches: WorldPlace[] = [];

  for (const place of worldPlaces) {
    const nameLower = place.name.toLowerCase();
    const countryLower = place.country.toLowerCase();

    if (nameLower.startsWith(q)) {
      prefixMatches.push(place);
    } else if (nameLower.includes(q) || countryLower.startsWith(q)) {
      containsMatches.push(place);
    }
  }

  return [...prefixMatches, ...containsMatches].slice(0, limit);
}
