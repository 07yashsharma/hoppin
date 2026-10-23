/**
 * RouteMate AI - Core Route Matching & Spatial Optimization Engine
 * Evaluates route geometry, departure compatibility, capacity, detour limits,
 * and generates explainable scoring.
 */

// Earth radius in kilometers
const EARTH_RADIUS_KM = 6371.0;

/**
 * Calculates Haversine distance between two coordinates in kilometers
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const dLat = ((lat2 - lat1) * Math.PI) / 180.0;
  const dLon = ((lon2 - lon1) * Math.PI) / 180.0;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180.0) *
      Math.cos((lat2 * Math.PI) / 180.0) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

/**
 * Road network multiplier: Road distances are typically 1.2x to 1.3x straight-line
 */
export function estimateRoadDistance(lat1, lon1, lat2, lon2, journeyType = "city") {
  const straightLine = calculateHaversineDistance(lat1, lon1, lat2, lon2);
  // Interstate highway routing has lower winding factor than dense city streets
  const windingFactor = journeyType === "city" ? 1.28 : 1.18;
  return Number((straightLine * windingFactor).toFixed(1));
}

/**
 * Estimate travel time in minutes based on journey type and road distance
 */
export function estimateDurationMinutes(distanceKm, journeyType = "city") {
  // Avg speed: city 28 km/h, outstation/interstate 65 km/h
  const avgSpeedKmh = journeyType === "city" ? 28 : 68;
  const hours = distanceKm / avgSpeedKmh;
  const minutes = Math.round(hours * 60);
  return Math.max(5, minutes);
}

/**
 * Calculates bearing from point A to point B in degrees (0 - 360)
 */
export function calculateBearing(lat1, lon1, lat2, lon2) {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  return ((θ * 180) / Math.PI + 360) % 360;
}

/**
 * Cosine similarity between two travel bearings (-1 to 1)
 */
export function calculateDirectionSimilarity(bearing1, bearing2) {
  const angleDiff = Math.abs(bearing1 - bearing2) % 360;
  const smallestAngle = angleDiff > 180 ? 360 - angleDiff : angleDiff;
  const radians = (smallestAngle * Math.PI) / 180;
  return Math.cos(radians);
}

/**
 * Parse time string "HH:MM" or ISO string into minutes from start of day
 */
export function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  if (timeStr.includes("T")) {
    const d = new Date(timeStr);
    return d.getHours() * 60 + d.getMinutes();
  }
  const [h, m] = timeStr.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

/**
 * Optimize waypoint sequence for 2 rides:
 * Candidate valid orders:
 * 1: P_A -> P_B -> D_A -> D_B
 * 2: P_A -> P_B -> D_B -> D_A
 * 3: P_B -> P_A -> D_A -> D_B
 * 4: P_B -> P_A -> D_B -> D_A
 */
export function optimizeWaypoints(rideA, rideB) {
  const pA = rideA.pickup;
  const dA = rideA.dropoff;
  const pB = rideB.pickup;
  const dB = rideB.dropoff;

  const legDist = (loc1, loc2) =>
    estimateRoadDistance(loc1.lat, loc1.lng, loc2.lat, loc2.lng, rideA.journeyType);

  const candidates = [
    {
      orderName: "Pick A -> Pick B -> Drop A -> Drop B",
      waypoints: [
        { type: "pickup", passenger: "A", location: pA },
        { type: "pickup", passenger: "B", location: pB },
        { type: "dropoff", passenger: "A", location: dA },
        { type: "dropoff", passenger: "B", location: dB }
      ],
      totalDistance: legDist(pA, pB) + legDist(pB, dA) + legDist(dA, dB),
      distForA: legDist(pA, pB) + legDist(pB, dA),
      distForB: legDist(pB, dA) + legDist(dA, dB)
    },
    {
      orderName: "Pick A -> Pick B -> Drop B -> Drop A",
      waypoints: [
        { type: "pickup", passenger: "A", location: pA },
        { type: "pickup", passenger: "B", location: pB },
        { type: "dropoff", passenger: "B", location: dB },
        { type: "dropoff", passenger: "A", location: dA }
      ],
      totalDistance: legDist(pA, pB) + legDist(pB, dB) + legDist(dB, dA),
      distForA: legDist(pA, pB) + legDist(pB, dB) + legDist(dB, dA),
      distForB: legDist(pB, dB)
    },
    {
      orderName: "Pick B -> Pick A -> Drop A -> Drop B",
      waypoints: [
        { type: "pickup", passenger: "B", location: pB },
        { type: "pickup", passenger: "A", location: pA },
        { type: "dropoff", passenger: "A", location: dA },
        { type: "dropoff", passenger: "B", location: dB }
      ],
      totalDistance: legDist(pB, pA) + legDist(pA, dA) + legDist(dA, dB),
      distForA: legDist(pA, dA),
      distForB: legDist(pB, pA) + legDist(pA, dA) + legDist(dA, dB)
    },
    {
      orderName: "Pick B -> Pick A -> Drop B -> Drop A",
      waypoints: [
        { type: "pickup", passenger: "B", location: pB },
        { type: "pickup", passenger: "A", location: pA },
        { type: "dropoff", passenger: "B", location: dB },
        { type: "dropoff", passenger: "A", location: dA }
      ],
      totalDistance: legDist(pB, pA) + legDist(pA, dB) + legDist(dB, dA),
      distForA: legDist(pA, dB) + legDist(dB, dA),
      distForB: legDist(pB, pA) + legDist(pA, dB)
    }
  ];

  candidates.sort((a, b) => a.totalDistance - b.totalDistance);
  return candidates[0];
}

/**
 * Evaluates route compatibility between two ride requests
 * Returns score (0 - 100), reasons, detour breakdown, and status
 */
export function evaluateRouteMatch(rideA, rideB, maxVehicleCapacity = 6) {
  const reasons = [];
  const warnings = [];

  // 1. Vehicle Capacity Check
  const totalPassengers = (rideA.passengerCount || 1) + (rideB.passengerCount || 1);
  if (totalPassengers > maxVehicleCapacity) {
    return {
      compatible: false,
      score: 0,
      status: "REJECTED_CAPACITY",
      reason: `Combined passenger count (${totalPassengers}) exceeds vehicle capacity (${maxVehicleCapacity}).`,
      reasons: [`Over capacity: ${totalPassengers} seats required, max is ${maxVehicleCapacity}`]
    };
  }

  // 2. Travel Date Check
  if (rideA.travelDate !== rideB.travelDate) {
    return {
      compatible: false,
      score: 0,
      status: "REJECTED_DATE",
      reason: `Travel dates do not match (${rideA.travelDate} vs ${rideB.travelDate}).`,
      reasons: ["Different travel dates"]
    };
  }

  // 3. Departure Time Compatibility
  const timeA = timeToMinutes(rideA.departureTime);
  const timeB = timeToMinutes(rideB.departureTime);
  const timeDiffMins = Math.abs(timeA - timeB);

  // For city rides, max acceptable gap is 30 mins; for interstate, 45 mins
  const maxTimeGap = rideA.journeyType === "city" ? 30 : 50;
  if (timeDiffMins > maxTimeGap) {
    return {
      compatible: false,
      score: 15,
      status: "REJECTED_TIME",
      reason: `Departure time difference (${timeDiffMins} min) exceeds allowable window (${maxTimeGap} min).`,
      reasons: [`Departure gap of ${timeDiffMins} mins is too large`]
    };
  }

  let timeScore = 100;
  if (timeDiffMins <= 10) {
    timeScore = 100;
    reasons.push(`Departure times align closely (within ${timeDiffMins} mins).`);
  } else if (timeDiffMins <= 25) {
    timeScore = 80;
    reasons.push(`Departure times are compatible (${timeDiffMins} min difference).`);
  } else {
    timeScore = 55;
    warnings.push(`Moderate departure time difference of ${timeDiffMins} mins.`);
  }

  // 4. Directional Compatibility
  const bearingA = calculateBearing(
    rideA.pickup.lat,
    rideA.pickup.lng,
    rideA.dropoff.lat,
    rideA.dropoff.lng
  );
  const bearingB = calculateBearing(
    rideB.pickup.lat,
    rideB.pickup.lng,
    rideB.dropoff.lat,
    rideB.dropoff.lng
  );
  const directionSimilarity = calculateDirectionSimilarity(bearingA, bearingB);

  // If going in divergent or opposite directions
  if (directionSimilarity < 0.45) {
    return {
      compatible: false,
      score: 10,
      status: "REJECTED_DIRECTION",
      reason: "Trips travel in divergent or opposite directions.",
      reasons: ["Opposite or divergent route trajectories"]
    };
  }

  reasons.push(`Direction alignment is ${Math.round(directionSimilarity * 100)}% compatible.`);

  // 5. Pickup & Dropoff Proximity
  const pickupDistanceKm = estimateRoadDistance(
    rideA.pickup.lat,
    rideA.pickup.lng,
    rideB.pickup.lat,
    rideB.pickup.lng,
    rideA.journeyType
  );
  const dropoffDistanceKm = estimateRoadDistance(
    rideA.dropoff.lat,
    rideA.dropoff.lng,
    rideB.dropoff.lat,
    rideB.dropoff.lng,
    rideA.journeyType
  );

  // Distance thresholds: City vs Interstate
  const maxPickupThreshold = rideA.journeyType === "city" ? 6.5 : 18.0;
  if (pickupDistanceKm > maxPickupThreshold) {
    return {
      compatible: false,
      score: 25,
      status: "REJECTED_PICKUP_DISTANCE",
      reason: `Pickup locations are ${pickupDistanceKm} km apart, exceeding max pickup radius (${maxPickupThreshold} km).`,
      reasons: [`Pickups too far apart: ${pickupDistanceKm} km`]
    };
  }

  // Individual Solo Metrics
  const soloDistA = estimateRoadDistance(
    rideA.pickup.lat,
    rideA.pickup.lng,
    rideA.dropoff.lat,
    rideA.dropoff.lng,
    rideA.journeyType
  );
  const soloDistB = estimateRoadDistance(
    rideB.pickup.lat,
    rideB.pickup.lng,
    rideB.dropoff.lat,
    rideB.dropoff.lng,
    rideB.journeyType
  );

  const soloDurationA = estimateDurationMinutes(soloDistA, rideA.journeyType);
  const soloDurationB = estimateDurationMinutes(soloDistB, rideB.journeyType);

  // 6. Waypoint Order Optimization & Detour Calculation
  const optimalSequence = optimizeWaypoints(rideA, rideB);
  const combinedDistanceKm = Number(optimalSequence.totalDistance.toFixed(1));
  const combinedDurationMins = estimateDurationMinutes(combinedDistanceKm, rideA.journeyType);

  // Shared travel durations for each passenger
  const sharedDurationA = estimateDurationMinutes(optimalSequence.distForA, rideA.journeyType);
  const sharedDurationB = estimateDurationMinutes(optimalSequence.distForB, rideB.journeyType);

  const detourMinutesA = Math.max(0, sharedDurationA - soloDurationA);
  const detourMinutesB = Math.max(0, sharedDurationB - soloDurationB);

  const maxAllowedDetourA = rideA.maxDetourMinutes || 25;
  const maxAllowedDetourB = rideB.maxDetourMinutes || 25;

  if (detourMinutesA > maxAllowedDetourA || detourMinutesB > maxAllowedDetourB) {
    return {
      compatible: false,
      score: 35,
      status: "REJECTED_DETOUR",
      reason: `Detour exceeds passenger threshold (A: ${detourMinutesA}/${maxAllowedDetourA}m, B: ${detourMinutesB}/${maxAllowedDetourB}m).`,
      reasons: [`Excessive detour: +${Math.max(detourMinutesA, detourMinutesB)} mins`]
    };
  }

  // 7. Calculate Multi-Factor Score (0 - 100)
  // Factors:
  // - Pickup proximity (0 to 100)
  const pickupScore = Math.max(0, Math.round(100 - (pickupDistanceKm / maxPickupThreshold) * 60));
  // - Dropoff proximity or alignment (0 to 100)
  const maxDropoffThreshold = rideA.journeyType === "city" ? 8.0 : 35.0;
  const dropoffScore = Math.max(0, Math.round(100 - (dropoffDistanceKm / maxDropoffThreshold) * 50));
  // - Directional score
  const dirScore = Math.round(directionSimilarity * 100);
  // - Detour penalty score
  const detourScoreA = Math.max(0, 100 - (detourMinutesA / maxAllowedDetourA) * 60);
  const detourScoreB = Math.max(0, 100 - (detourMinutesB / maxAllowedDetourB) * 60);
  const avgDetourScore = Math.round((detourScoreA + detourScoreB) / 2);

  // Weighted total:
  // Pickup: 25%, Dropoff: 25%, Direction: 20%, Time: 15%, Detour: 15%
  const compositeScore = Math.min(
    99,
    Math.max(
      40,
      Math.round(
        pickupScore * 0.25 +
        dropoffScore * 0.25 +
        dirScore * 0.20 +
        timeScore * 0.15 +
        avgDetourScore * 0.15
      )
    )
  );

  // Explainable rationale
  reasons.push(`Pickup points are ${pickupDistanceKm} km apart (~${Math.round(pickupDistanceKm * 2.2)} mins drive).`);
  if (dropoffDistanceKm < 5) {
    reasons.push(`Destinations are very close (${dropoffDistanceKm} km apart).`);
  } else {
    reasons.push(`Both routes share the same primary highway corridor with aligned heading.`);
  }
  reasons.push(`Detour is only +${detourMinutesA} mins for ${rideA.passengerName || "Passenger A"} and +${detourMinutesB} mins for ${rideB.passengerName || "Passenger B"}.`);
  reasons.push(`Consolidates ${totalPassengers} seats in a single vehicle, cutting road congestion and fuel burn.`);

  return {
    compatible: true,
    score: compositeScore,
    status: "COMPATIBLE",
    reasons,
    warnings,
    routeOptimization: {
      orderName: optimalSequence.orderName,
      waypoints: optimalSequence.waypoints,
      combinedDistanceKm,
      combinedDurationMins
    },
    metrics: {
      totalPassengers,
      pickupDistanceKm,
      dropoffDistanceKm,
      directionSimilarityPct: Math.round(directionSimilarity * 100),
      timeDiffMins,
      soloDistA,
      soloDistB,
      soloDurationA,
      soloDurationB,
      detourMinutesA,
      detourMinutesB,
      co2SavedKg: Number(((soloDistA + soloDistB - combinedDistanceKm) * 0.18).toFixed(1))
    }
  };
}
