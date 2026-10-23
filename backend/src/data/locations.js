/**
 * Verified Indian locations & transit hubs with precise geo-coordinates
 * Used for realistic route calculation, detour evaluation, and autocomplete
 */
export const LOCATIONS = [
  // --- JAIPUR CITY & AIRPORT ---
  {
    id: "loc_jpr_station",
    name: "Jaipur Junction Railway Station",
    address: "Station Road, Gopalbari, Jaipur, Rajasthan 302006",
    city: "Jaipur",
    state: "Rajasthan",
    category: "transit",
    lat: 26.9196,
    lng: 75.7878,
    popular: true
  },
  {
    id: "loc_jpr_airport",
    name: "Jaipur International Airport (JAI)",
    address: "Airport Road, Sanganer, Jaipur, Rajasthan 302029",
    city: "Jaipur",
    state: "Rajasthan",
    category: "airport",
    lat: 26.8242,
    lng: 75.8122,
    popular: true
  },
  {
    id: "loc_jpr_ajmer_rd",
    name: "Ajmer Road / 200 Ft Bypass",
    address: "Ajmer Road, Purani Chungi, Jaipur, Rajasthan 302019",
    city: "Jaipur",
    state: "Rajasthan",
    category: "landmark",
    lat: 26.8905,
    lng: 75.7289,
    popular: true
  },
  {
    id: "loc_jpr_mi_rd",
    name: "MI Road (Mirza Ismail Road)",
    address: "Panch Batti, C-Scheme, Jaipur, Rajasthan 302001",
    city: "Jaipur",
    state: "Rajasthan",
    category: "commercial",
    lat: 26.9171,
    lng: 75.8118,
    popular: true
  },
  {
    id: "loc_jpr_vaishali",
    name: "Vaishali Nagar Amrapali Circle",
    address: "Amrapali Marg, Vaishali Nagar, Jaipur, Rajasthan 302021",
    city: "Jaipur",
    state: "Rajasthan",
    category: "residential",
    lat: 26.9080,
    lng: 75.7380,
    popular: true
  },
  {
    id: "loc_jpr_mansarovar",
    name: "Mansarovar Metro Station",
    address: "Bhrigu Marg, Mansarovar, Jaipur, Rajasthan 302020",
    city: "Jaipur",
    state: "Rajasthan",
    category: "transit",
    lat: 26.8687,
    lng: 75.7628,
    popular: true
  },
  {
    id: "loc_jpr_wtp",
    name: "World Trade Park (WTP) / Malviya Nagar",
    address: "Jawahar Lal Nehru Marg, Malviya Nagar, Jaipur, Rajasthan 302017",
    city: "Jaipur",
    state: "Rajasthan",
    category: "commercial",
    lat: 26.8530,
    lng: 75.8050,
    popular: true
  },
  {
    id: "loc_jpr_sitapura",
    name: "Sitapura Industrial & Tech Park",
    address: "RIICO Industrial Area, Sitapura, Jaipur, Rajasthan 302022",
    city: "Jaipur",
    state: "Rajasthan",
    category: "business",
    lat: 26.7794,
    lng: 75.8450,
    popular: false
  },
  {
    id: "loc_jpr_amer",
    name: "Amer Fort Heritage Area",
    address: "Devisinghpura, Amer, Jaipur, Rajasthan 302001",
    city: "Jaipur",
    state: "Rajasthan",
    category: "tourism",
    lat: 26.9855,
    lng: 75.8513,
    popular: false
  },

  // --- DELHI NCR ---
  {
    id: "loc_del_igi_t3",
    name: "Delhi IGI Airport (DEL) Terminal 3",
    address: "Indira Gandhi International Airport, New Delhi, Delhi 110037",
    city: "Delhi",
    state: "Delhi",
    category: "airport",
    lat: 28.5562,
    lng: 77.1000,
    popular: true
  },
  {
    id: "loc_del_cp",
    name: "Connaught Place (Inner Circle)",
    address: "Connaught Place, New Delhi, Delhi 110001",
    city: "Delhi",
    state: "Delhi",
    category: "commercial",
    lat: 28.6315,
    lng: 77.2167,
    popular: true
  },
  {
    id: "loc_ggn_cyberhub",
    name: "Cyber Hub / DLF Phase 2 Gurugram",
    address: "NH 48, DLF Cyber City, Gurugram, Haryana 122002",
    city: "Gurugram",
    state: "Haryana",
    category: "business",
    lat: 28.4950,
    lng: 77.0895,
    popular: true
  },
  {
    id: "loc_del_ndls",
    name: "New Delhi Railway Station (NDLS)",
    address: "Paharganj, New Delhi, Delhi 110006",
    city: "Delhi",
    state: "Delhi",
    category: "transit",
    lat: 28.6430,
    lng: 77.2197,
    popular: true
  },
  {
    id: "loc_noida_sec62",
    name: "Noida Electronic City / Sector 62",
    address: "Sector 62, Noida, Uttar Pradesh 201309",
    city: "Noida",
    state: "Uttar Pradesh",
    category: "business",
    lat: 28.6280,
    lng: 77.3649,
    popular: false
  },

  // --- AJMER & INTERMEDIATE HIGHWAY STOPS ---
  {
    id: "loc_ajm_dargah",
    name: "Ajmer Sharif Dargah Gate",
    address: "Dargah Bazar, Ajmer, Rajasthan 305001",
    city: "Ajmer",
    state: "Rajasthan",
    category: "landmark",
    lat: 26.4561,
    lng: 74.6282,
    popular: true
  },
  {
    id: "loc_ajm_station",
    name: "Ajmer Junction Railway Station",
    address: "Station Road, Topdara, Ajmer, Rajasthan 305001",
    city: "Ajmer",
    state: "Rajasthan",
    category: "transit",
    lat: 26.4542,
    lng: 74.6391,
    popular: true
  },
  {
    id: "loc_pushkar_temple",
    name: "Brahma Temple Pushkar",
    address: "Brahma Temple Rd, Pushkar, Rajasthan 305022",
    city: "Pushkar",
    state: "Rajasthan",
    category: "landmark",
    lat: 26.4890,
    lng: 74.5511,
    popular: false
  },
  {
    id: "loc_kishangarh",
    name: "Kishangarh Marble Market / Toll Plaza",
    address: "NH 48, Madanganj-Kishangarh, Rajasthan 305801",
    city: "Kishangarh",
    state: "Rajasthan",
    category: "transit",
    lat: 26.5772,
    lng: 74.8653,
    popular: false
  },
  {
    id: "loc_behror_midway",
    name: "Behror Midway Plaza (NH 48)",
    address: "Delhi-Jaipur Expressway, Behror, Rajasthan 301701",
    city: "Behror",
    state: "Rajasthan",
    category: "highway_stop",
    lat: 27.8872,
    lng: 76.2825,
    popular: false
  }
];

export function findLocationById(id) {
  return LOCATIONS.find(l => l.id === id) || null;
}

export function searchLocations(query, filterCity = null) {
  if (!query || query.trim().length === 0) {
    if (filterCity) {
      return LOCATIONS.filter(l => l.city.toLowerCase() === filterCity.toLowerCase());
    }
    return LOCATIONS.slice(0, 10);
  }
  const q = query.toLowerCase().trim();
  return LOCATIONS.filter(l => {
    const matchesQuery = 
      l.name.toLowerCase().includes(q) ||
      l.address.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q) ||
      l.category.toLowerCase().includes(q);
    const matchesCity = filterCity ? l.city.toLowerCase() === filterCity.toLowerCase() : true;
    return matchesQuery && matchesCity;
  });
}
