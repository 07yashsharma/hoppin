/**
 * hopin - Frontend API Client
 */

export interface LocationItem {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  category: string;
  lat: number;
  lng: number;
  popular?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "passenger" | "driver" | "admin";
  phone: string;
  avatar: string;
  phoneVerified: boolean;
  emailVerified: boolean;
  idVerified: boolean;
  bio?: string;
  preferredLanguage?: string;
  preferences?: {
    quietRide?: boolean;
    acPreferred?: boolean;
    allowPet?: boolean;
    luggageCapacity?: string;
  };
  totalCompletedRides?: number;
  averageRating?: number;
  ratingBreakdown?: {
    punctuality: number;
    courtesy: number;
    communication: number;
    cleanliness: number;
    overall: number;
  };
  reviewCount?: number;
  topTags?: string[];
  emergencyContacts?: Array<{ id: string; name: string; phone: string; relationship: string }>;
  driverLicenseNumber?: string;
  vehiclePlate?: string;
}

export interface Ride {
  id: string;
  userId: string;
  passengerName: string;
  passengerAvatar: string;
  passengerRating: number;
  journeyType: "city" | "outstation" | "interstate";
  rideType: "private" | "shared";
  pickup: LocationItem;
  dropoff: LocationItem;
  travelDate: string;
  departureTime: string;
  passengerCount: number;
  luggageCount: number;
  maxDetourMinutes?: number;
  distanceKm: number;
  durationMinutes: number;
  privateFare: number;
  fare: number;
  savingsAmount?: number;
  savingsPct?: number;
  status: "pending_match" | "matched" | "driver_assigned" | "arriving" | "in_progress" | "completed" | "cancelled";
  activeMatchId?: string;
  assignedDriverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverRating?: number;
  vehiclePlate?: string;
  vehicleModel?: string;
  coPassenger?: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
  };
  otp?: string;
  currentLocation?: {
    lat: number;
    lng: number;
    checkpoint?: string;
  };
  hasReviewedCoPassenger?: boolean;
  createdAt: string;
}

export interface RouteMatch {
  id: string;
  rideAId: string;
  rideBId: string;
  passengerAName: string;
  passengerBName: string;
  passengerAId: string;
  passengerBId: string;
  passengerAAvatar: string;
  passengerBAvatar: string;
  journeyType: string;
  routeTitle: string;
  score: number;
  status: "pending_acceptance" | "confirmed" | "declined" | "cancelled_by_partner";
  acceptedByA: boolean;
  acceptedByB: boolean;
  reasons: string[];
  pricing: {
    passengerA: {
      passengerId: string;
      name: string;
      privateFare: number;
      sharedFare: number;
      savingsAmount: number;
      savingsPercentage: number;
      detourMinutes: number;
    };
    passengerB: {
      passengerId: string;
      name: string;
      privateFare: number;
      sharedFare: number;
      savingsAmount: number;
      savingsPercentage: number;
      detourMinutes: number;
    };
    totalPassengerCollected: number;
    driverPayout: number;
    platformFee: number;
    totalCo2SavedKg: number;
  };
  waypoints: Array<{
    order: number;
    type: "pickup" | "dropoff";
    passenger: string;
    locationName: string;
    time: string;
  }>;
  vehicleRecommendation?: {
    model: string;
    category: string;
    driverName: string;
    driverRating: number;
  };
}

const API_BASE = '/api';

export async function fetchLocations(query = '', city = ''): Promise<LocationItem[]> {
  const params = new URLSearchParams();
  if (query) params.append('q', query);
  if (city) params.append('city', city);
  const res = await fetch(`${API_BASE}/locations?${params}`);
  const data = await res.json();
  return data.locations || [];
}

export async function getCurrentUser(): Promise<User> {
  const res = await fetch(`${API_BASE}/auth/me`);
  const data = await res.json();
  return data.user;
}

export async function getDemoAccounts(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/auth/demo-accounts`);
  const data = await res.json();
  return data.accounts || [];
}

export async function switchDemoUser(userId: string): Promise<User> {
  const res = await fetch(`${API_BASE}/auth/switch-demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });
  const data = await res.json();
  return data.user;
}

export async function loginUser(email: string, password?: string): Promise<{ user: User; message: string }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Authentication failed');
  return data;
}

export async function registerUser(payload: { name: string; email: string; phone?: string; role?: string }): Promise<{ user: User; message: string }> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
}

export async function requestPasswordReset(email: string): Promise<{ message: string; resetToken?: string }> {
  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Password reset request failed');
  return data;
}

export async function resetUserPassword(payload: { email: string; newPassword: string; token?: string }): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Password reset failed');
  return data;
}


export async function createRideBooking(payload: any): Promise<{ ride: Ride; match?: RouteMatch }> {
  const res = await fetch(`${API_BASE}/rides`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create ride');
  return data;
}

export async function getRides(userId?: string): Promise<Ride[]> {
  const params = userId ? `?userId=${userId}` : '';
  const res = await fetch(`${API_BASE}/rides${params}`);
  const data = await res.json();
  return data.rides || [];
}

export async function getRideDetails(id: string): Promise<{ ride: Ride; match?: RouteMatch }> {
  const res = await fetch(`${API_BASE}/rides/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Ride not found');
  return data;
}

export async function cancelRideBooking(id: string): Promise<Ride> {
  const res = await fetch(`${API_BASE}/rides/${id}/cancel`, { method: 'POST' });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Cancellation failed');
  return data.ride;
}

export async function advanceRideStatus(id: string, nextStatus?: string): Promise<Ride> {
  const res = await fetch(`${API_BASE}/rides/${id}/simulate-status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nextStatus })
  });
  const data = await res.json();
  return data.ride;
}

export async function getAllMatches(): Promise<RouteMatch[]> {
  const res = await fetch(`${API_BASE}/matches`);
  const data = await res.json();
  return data.matches || [];
}

export async function getMatchesForRide(rideId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/matches/for-ride/${rideId}`);
  return await res.json();
}

export async function acceptProposedMatch(matchId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/matches/${matchId}/accept`, { method: 'POST' });
  return await res.json();
}

export async function declineProposedMatch(matchId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/matches/${matchId}/decline`, { method: 'POST' });
  return await res.json();
}

export async function getPassengerReviews(passengerId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/reviews/passenger/${passengerId}`);
  return await res.json();
}

export async function submitPassengerReview(payload: any): Promise<any> {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to submit review');
  return data;
}

export async function triggerEmergencySOSAlert(rideId?: string, location?: any): Promise<any> {
  const res = await fetch(`${API_BASE}/safety/emergency-sos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rideId, currentLocation: location })
  });
  return await res.json();
}

export async function addEmergencyContact(contact: { name: string; phone: string; relationship: string }): Promise<any> {
  const res = await fetch(`${API_BASE}/safety/emergency-contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  return await res.json();
}

export async function reportSafetyIncident(payload: any): Promise<any> {
  const res = await fetch(`${API_BASE}/safety/report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return await res.json();
}

export async function getDriverDashboard(): Promise<any> {
  const res = await fetch(`${API_BASE}/driver/dashboard`);
  return await res.json();
}

export async function updateDriverTripStatus(rideId: string, status: string): Promise<any> {
  const res = await fetch(`${API_BASE}/driver/trip-status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rideId, status })
  });
  return await res.json();
}

export async function getAdminAnalytics(): Promise<any> {
  const res = await fetch(`${API_BASE}/admin/analytics`);
  return await res.json();
}

export async function updateSystemConfig(config: any): Promise<any> {
  const res = await fetch(`${API_BASE}/admin/config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  });
  return await res.json();
}

export async function resetDatabaseDemo(): Promise<any> {
  const res = await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
  return await res.json();
}
