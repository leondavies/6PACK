export const gyms = [
  // Auckland Gyms
  {
    id: 1,
    name: "City Fitness Queen Street",
    chain: "City Fitness",
    address: "204 Queen Street, Auckland CBD, Auckland 1010",
    suburb: "Auckland CBD",
    city: "Auckland",
    coordinates: {
      lat: -36.8485,
      lng: 174.7633
    },
    phone: "09 379 5000",
    website: "https://cityfitness.co.nz",
    hours: {
      monday: "5:00 AM - 11:00 PM",
      tuesday: "5:00 AM - 11:00 PM", 
      wednesday: "5:00 AM - 11:00 PM",
      thursday: "5:00 AM - 11:00 PM",
      friday: "5:00 AM - 10:00 PM",
      saturday: "7:00 AM - 9:00 PM",
      sunday: "7:00 AM - 9:00 PM"
    },
    amenities: ["Cardio Equipment", "Free Weights", "Group Classes", "Personal Training", "Lockers", "Showers"],
    features: ["24/7 Access", "Air Conditioning", "WiFi"],
    membershipTypes: ["Basic", "Premium"],
    priceRange: "$$",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&fm=webp&q=85"
  },
  {
    id: 2,
    name: "Anytime Fitness Newmarket",
    chain: "Anytime Fitness",
    address: "309 Broadway, Newmarket, Auckland 1023",
    suburb: "Newmarket",
    city: "Auckland",
    coordinates: {
      lat: -36.8707,
      lng: 174.7756
    },
    phone: "09 520 3247",
    website: "https://anytimefitness.co.nz",
    hours: {
      monday: "24 Hours",
      tuesday: "24 Hours",
      wednesday: "24 Hours", 
      thursday: "24 Hours",
      friday: "24 Hours",
      saturday: "24 Hours",
      sunday: "24 Hours"
    },
    amenities: ["Cardio Equipment", "Free Weights", "Functional Training", "Personal Training", "Lockers", "Showers"],
    features: ["24/7 Access", "Security Access", "Global Access"],
    membershipTypes: ["Standard"],
    priceRange: "$$$",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop&fm=webp&q=85"
  },
  {
    id: 3,
    name: "Les Mills Takapuna",
    chain: "Les Mills",
    address: "2 Northcote Road, Takapuna, Auckland 0622",
    suburb: "Takapuna",
    city: "Auckland",
    coordinates: {
      lat: -36.7867,
      lng: 174.7691
    },
    phone: "09 486 2104",
    website: "https://lesmills.co.nz",
    hours: {
      monday: "5:30 AM - 10:00 PM",
      tuesday: "5:30 AM - 10:00 PM",
      wednesday: "5:30 AM - 10:00 PM",
      thursday: "5:30 AM - 10:00 PM", 
      friday: "5:30 AM - 9:00 PM",
      saturday: "7:00 AM - 7:00 PM",
      sunday: "7:00 AM - 7:00 PM"
    },
    amenities: ["Cardio Equipment", "Free Weights", "Group Classes", "Swimming Pool", "Sauna", "Personal Training", "Lockers", "Showers", "Childcare"],
    features: ["Premium Equipment", "Pool", "Sauna", "Spa"],
    membershipTypes: ["Gym Only", "Gym + Pool", "Premium"],
    priceRange: "$$$$",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop&fm=webp&q=85"
  },
  {
    id: 4,
    name: "Jetts Sylvia Park",
    chain: "Jetts",
    address: "286 Mount Wellington Highway, Mount Wellington, Auckland 1060",
    suburb: "Mount Wellington",
    city: "Auckland",
    coordinates: {
      lat: -36.9108,
      lng: 174.8407
    },
    phone: "09 570 0080",
    website: "https://jetts.co.nz",
    hours: {
      monday: "24 Hours",
      tuesday: "24 Hours",
      wednesday: "24 Hours",
      thursday: "24 Hours",
      friday: "24 Hours",
      saturday: "24 Hours", 
      sunday: "24 Hours"
    },
    amenities: ["Cardio Equipment", "Free Weights", "Functional Training", "Personal Training", "Lockers", "Showers"],
    features: ["24/7 Access", "No Contract Options", "Budget Friendly"],
    membershipTypes: ["Basic", "Premium"],
    priceRange: "$$",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop&fm=webp&q=85"
  },

  // Wellington Gyms
  {
    id: 5,
    name: "CityFitness Lambton Quay",
    chain: "City Fitness",
    address: "181 Lambton Quay, Wellington 6011",
    suburb: "Wellington Central",
    city: "Wellington",
    coordinates: {
      lat: -41.2865,
      lng: 174.7762
    },
    phone: "04 499 4430",
    website: "https://cityfitness.co.nz",
    hours: {
      monday: "5:00 AM - 11:00 PM",
      tuesday: "5:00 AM - 11:00 PM",
      wednesday: "5:00 AM - 11:00 PM",
      thursday: "5:00 AM - 11:00 PM",
      friday: "5:00 AM - 10:00 PM",
      saturday: "7:00 AM - 9:00 PM",
      sunday: "7:00 AM - 9:00 PM"
    },
    amenities: ["Cardio Equipment", "Free Weights", "Group Classes", "Personal Training", "Lockers", "Showers"],
    features: ["City Location", "Modern Equipment", "Air Conditioning"],
    membershipTypes: ["Basic", "Premium"],
    priceRange: "$$",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&fm=webp&q=85"
  },
  {
    id: 6,
    name: "Anytime Fitness Courtenay Place",
    chain: "Anytime Fitness", 
    address: "119 Courtenay Place, Wellington 6011",
    suburb: "Wellington Central",
    city: "Wellington",
    coordinates: {
      lat: -41.2934,
      lng: 174.7804
    },
    phone: "04 385 8686",
    website: "https://anytimefitness.co.nz",
    hours: {
      monday: "24 Hours",
      tuesday: "24 Hours",
      wednesday: "24 Hours",
      thursday: "24 Hours", 
      friday: "24 Hours",
      saturday: "24 Hours",
      sunday: "24 Hours"
    },
    amenities: ["Cardio Equipment", "Free Weights", "Functional Training", "Personal Training", "Lockers", "Showers"],
    features: ["24/7 Access", "Security Access", "Global Access"],
    membershipTypes: ["Standard"],
    priceRange: "$$$",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop&fm=webp&q=85"
  },

  // Christchurch Gyms
  {
    id: 7,
    name: "Les Mills Christchurch",
    chain: "Les Mills",
    address: "12 Moorhouse Avenue, Christchurch 8011",
    suburb: "Christchurch Central",
    city: "Christchurch",
    coordinates: {
      lat: -43.5351,
      lng: 172.6362
    },
    phone: "03 366 0023",
    website: "https://lesmills.co.nz",
    hours: {
      monday: "5:30 AM - 10:00 PM",
      tuesday: "5:30 AM - 10:00 PM",
      wednesday: "5:30 AM - 10:00 PM",
      thursday: "5:30 AM - 10:00 PM",
      friday: "5:30 AM - 9:00 PM",
      saturday: "7:00 AM - 7:00 PM", 
      sunday: "7:00 AM - 7:00 PM"
    },
    amenities: ["Cardio Equipment", "Free Weights", "Group Classes", "Swimming Pool", "Sauna", "Personal Training", "Lockers", "Showers", "Childcare"],
    features: ["Premium Equipment", "Pool", "Sauna", "Spa"],
    membershipTypes: ["Gym Only", "Gym + Pool", "Premium"],
    priceRange: "$$$$",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop&fm=webp&q=85"
  },
  {
    id: 8,
    name: "Jetts Riccarton",
    chain: "Jetts",
    address: "129 Riccarton Road, Riccarton, Christchurch 8041",
    suburb: "Riccarton",
    city: "Christchurch",
    coordinates: {
      lat: -43.5320,
      lng: 172.5879
    },
    phone: "03 348 3348",
    website: "https://jetts.co.nz",
    hours: {
      monday: "24 Hours",
      tuesday: "24 Hours",
      wednesday: "24 Hours",
      thursday: "24 Hours",
      friday: "24 Hours",
      saturday: "24 Hours",
      sunday: "24 Hours"
    },
    amenities: ["Cardio Equipment", "Free Weights", "Functional Training", "Personal Training", "Lockers", "Showers"],
    features: ["24/7 Access", "No Contract Options", "Budget Friendly"],
    membershipTypes: ["Basic", "Premium"],
    priceRange: "$$",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop&fm=webp&q=85"
  },

  // Hamilton Gyms
  {
    id: 9,
    name: "CityFitness Hamilton Central",
    chain: "City Fitness",
    address: "120 Victoria Street, Hamilton 3204",
    suburb: "Hamilton Central",
    city: "Hamilton",
    coordinates: {
      lat: -37.7871,
      lng: 175.2799
    },
    phone: "07 838 2348",
    website: "https://cityfitness.co.nz",
    hours: {
      monday: "5:00 AM - 11:00 PM",
      tuesday: "5:00 AM - 11:00 PM",
      wednesday: "5:00 AM - 11:00 PM",
      thursday: "5:00 AM - 11:00 PM",
      friday: "5:00 AM - 10:00 PM",
      saturday: "7:00 AM - 9:00 PM",
      sunday: "7:00 AM - 9:00 PM"
    },
    amenities: ["Cardio Equipment", "Free Weights", "Group Classes", "Personal Training", "Lockers", "Showers"],
    features: ["Central Location", "Modern Equipment", "Air Conditioning"],
    membershipTypes: ["Basic", "Premium"],
    priceRange: "$$",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&fm=webp&q=85"
  },

  // Tauranga Gyms
  {
    id: 10,
    name: "Anytime Fitness Tauranga",
    chain: "Anytime Fitness",
    address: "81 Devonport Road, Tauranga 3110",
    suburb: "Tauranga Central",
    city: "Tauranga",
    coordinates: {
      lat: -37.6878,
      lng: 176.1665
    },
    phone: "07 578 4420",
    website: "https://anytimefitness.co.nz",
    hours: {
      monday: "24 Hours",
      tuesday: "24 Hours", 
      wednesday: "24 Hours",
      thursday: "24 Hours",
      friday: "24 Hours",
      saturday: "24 Hours",
      sunday: "24 Hours"
    },
    amenities: ["Cardio Equipment", "Free Weights", "Functional Training", "Personal Training", "Lockers", "Showers"],
    features: ["24/7 Access", "Security Access", "Global Access"],
    membershipTypes: ["Standard"],
    priceRange: "$$$",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop&fm=webp&q=85"
  },

  // Dunedin Gyms
  {
    id: 11,
    name: "Jetts Dunedin Central",
    chain: "Jetts",
    address: "84 Princes Street, Dunedin 9016",
    suburb: "Dunedin Central",
    city: "Dunedin", 
    coordinates: {
      lat: -45.8788,
      lng: 170.5028
    },
    phone: "03 477 0088",
    website: "https://jetts.co.nz",
    hours: {
      monday: "24 Hours",
      tuesday: "24 Hours",
      wednesday: "24 Hours",
      thursday: "24 Hours",
      friday: "24 Hours",
      saturday: "24 Hours",
      sunday: "24 Hours"
    },
    amenities: ["Cardio Equipment", "Free Weights", "Functional Training", "Personal Training", "Lockers", "Showers"],
    features: ["24/7 Access", "No Contract Options", "Budget Friendly"],
    membershipTypes: ["Basic", "Premium"],
    priceRange: "$$",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop&fm=webp&q=85"
  },

  // Palmerston North Gyms
  {
    id: 12,
    name: "CityFitness Palmerston North",
    chain: "City Fitness",
    address: "435 Ferguson Street, Palmerston North 4410",
    suburb: "Palmerston North Central",
    city: "Palmerston North",
    coordinates: {
      lat: -40.3523,
      lng: 175.6082
    },
    phone: "06 357 4440",
    website: "https://cityfitness.co.nz",
    hours: {
      monday: "5:00 AM - 11:00 PM",
      tuesday: "5:00 AM - 11:00 PM",
      wednesday: "5:00 AM - 11:00 PM", 
      thursday: "5:00 AM - 11:00 PM",
      friday: "5:00 AM - 10:00 PM",
      saturday: "7:00 AM - 9:00 PM",
      sunday: "7:00 AM - 9:00 PM"
    },
    amenities: ["Cardio Equipment", "Free Weights", "Group Classes", "Personal Training", "Lockers", "Showers"],
    features: ["Central Location", "Modern Equipment", "Air Conditioning"],
    membershipTypes: ["Basic", "Premium"],
    priceRange: "$$",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&fm=webp&q=85"
  }
];

// Helper function to calculate distance between two coordinates using Haversine formula
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in kilometers
  return Math.round(d * 10) / 10; // Round to 1 decimal place
}

// Helper function to get gyms within a certain radius
export function getGymsWithinRadius(userLat, userLng, radiusKm) {
  return gyms.map(gym => ({
    ...gym,
    distance: calculateDistance(userLat, userLng, gym.coordinates.lat, gym.coordinates.lng)
  })).filter(gym => gym.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
}

// Helper function to get unique cities
export function getUniqueCities() {
  return [...new Set(gyms.map(gym => gym.city))].sort();
}

// Helper function to get unique chains
export function getUniqueChains() {
  return [...new Set(gyms.map(gym => gym.chain))].sort();
}

// Helper function to get unique amenities
export function getUniqueAmenities() {
  const allAmenities = gyms.flatMap(gym => gym.amenities);
  return [...new Set(allAmenities)].sort();
}