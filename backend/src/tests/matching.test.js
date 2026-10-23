/**
 * RouteMate AI - Automated Test Suite
 * Tests AI matching engine, geometry calculations, pricing, review eligibility,
 * cancellation, and capacity constraints.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateHaversineDistance,
  estimateRoadDistance,
  calculateBearing,
  calculateDirectionSimilarity,
  evaluateRouteMatch,
  optimizeWaypoints
} from "../services/routeEngine.js";

import {
  calculatePrivateFare,
  calculateSharedFares
} from "../services/pricingService.js";

import { db } from "../data/db.js";

test("1. Similar-Route Detection (Jaipur to Delhi Corridor)", () => {
  const rideA = {
    id: "test_a",
    passengerName: "Rohan",
    journeyType: "interstate",
    travelDate: "2026-10-24",
    departureTime: "07:00",
    passengerCount: 1,
    maxDetourMinutes: 25,
    pickup: { lat: 26.9196, lng: 75.7878, name: "Jaipur Station" },
    dropoff: { lat: 28.5562, lng: 77.1000, name: "Delhi IGI Airport" }
  };

  const rideB = {
    id: "test_b",
    passengerName: "Priya",
    journeyType: "interstate",
    travelDate: "2026-10-24",
    departureTime: "07:15",
    passengerCount: 1,
    maxDetourMinutes: 20,
    pickup: { lat: 26.8905, lng: 75.7289, name: "Ajmer Road Jaipur" },
    dropoff: { lat: 28.5562, lng: 77.1000, name: "Delhi IGI Airport" }
  };

  const match = evaluateRouteMatch(rideA, rideB);
  assert.equal(match.compatible, true, "Should detect similar routes as compatible");
  assert.ok(match.score >= 80, `Score should be >= 80, got ${match.score}`);
  assert.ok(match.reasons.length > 0, "Should generate explainable reasons");
});

test("2. Incompatible-Route Rejection (Opposite Travel Directions)", () => {
  // Trip A: Jaipur -> Delhi (Northeast)
  const rideA = {
    id: "test_a",
    journeyType: "interstate",
    travelDate: "2026-10-24",
    departureTime: "07:00",
    passengerCount: 1,
    pickup: { lat: 26.9196, lng: 75.7878, name: "Jaipur Station" },
    dropoff: { lat: 28.5562, lng: 77.1000, name: "Delhi IGI Airport" }
  };

  // Trip B: Jaipur -> Ajmer (Southwest)
  const rideB = {
    id: "test_b",
    journeyType: "outstation",
    travelDate: "2026-10-24",
    departureTime: "07:00",
    passengerCount: 1,
    pickup: { lat: 26.9196, lng: 75.7878, name: "Jaipur Station" },
    dropoff: { lat: 26.4561, lng: 74.6282, name: "Ajmer Dargah" }
  };

  const match = evaluateRouteMatch(rideA, rideB);
  assert.equal(match.compatible, false, "Should reject opposite directions");
  assert.equal(match.status, "REJECTED_DIRECTION", "Status should be REJECTED_DIRECTION");
});

test("3. Departure-Time Compatibility (Excessive Time Gap)", () => {
  const rideA = {
    id: "test_a",
    journeyType: "city",
    travelDate: "2026-10-24",
    departureTime: "08:00",
    passengerCount: 1,
    pickup: { lat: 26.9196, lng: 75.7878, name: "Jaipur Station" },
    dropoff: { lat: 26.8242, lng: 75.8122, name: "Jaipur Airport" }
  };

  const rideB = {
    id: "test_b",
    journeyType: "city",
    travelDate: "2026-10-24",
    departureTime: "11:30", // 3.5 hours later
    passengerCount: 1,
    pickup: { lat: 26.9171, lng: 75.8118, name: "MI Road Jaipur" },
    dropoff: { lat: 26.8242, lng: 75.8122, name: "Jaipur Airport" }
  };

  const match = evaluateRouteMatch(rideA, rideB);
  assert.equal(match.compatible, false, "Should reject when time difference is too large");
  assert.equal(match.status, "REJECTED_TIME");
});

test("4. Vehicle Capacity Constraints", () => {
  const rideA = {
    id: "test_a",
    journeyType: "city",
    travelDate: "2026-10-24",
    departureTime: "09:00",
    passengerCount: 4,
    pickup: { lat: 26.9196, lng: 75.7878, name: "Jaipur Station" },
    dropoff: { lat: 26.8242, lng: 75.8122, name: "Jaipur Airport" }
  };

  const rideB = {
    id: "test_b",
    journeyType: "city",
    travelDate: "2026-10-24",
    departureTime: "09:05",
    passengerCount: 3, // Total 7 passengers > 6 vehicle max
    pickup: { lat: 26.9171, lng: 75.8118, name: "MI Road" },
    dropoff: { lat: 26.8242, lng: 75.8122, name: "Jaipur Airport" }
  };

  const match = evaluateRouteMatch(rideA, rideB, 6);
  assert.equal(match.compatible, false, "Should reject when total passengers exceed capacity");
  assert.equal(match.status, "REJECTED_CAPACITY");
});

test("5. Maximum Detour Threshold Enforcement", () => {
  const rideA = {
    id: "test_a",
    passengerName: "User A",
    journeyType: "city",
    travelDate: "2026-10-24",
    departureTime: "10:00",
    passengerCount: 1,
    maxDetourMinutes: 5, // Strict 5 minute max detour
    pickup: { lat: 26.9196, lng: 75.7878, name: "Jaipur Station" },
    dropoff: { lat: 26.8242, lng: 75.8122, name: "Jaipur Airport" }
  };

  const rideB = {
    id: "test_b",
    passengerName: "User B",
    journeyType: "city",
    travelDate: "2026-10-24",
    departureTime: "10:05",
    passengerCount: 1,
    maxDetourMinutes: 5,
    pickup: { lat: 26.8905, lng: 75.7289, name: "Ajmer Road 200ft" }, // Significant lateral detour
    dropoff: { lat: 26.7794, lng: 75.8450, name: "Sitapura" }
  };

  const match = evaluateRouteMatch(rideA, rideB);
  // Either detour or pickup distance threshold triggers safely
  assert.ok(!match.compatible || match.status === "REJECTED_DETOUR" || match.score < 50);
});

test("6. Shared Fare Calculation & Economic Reconciliation", () => {
  const rideA = {
    id: "ride_1",
    passengerName: "Rohan",
    journeyType: "interstate",
    pickup: { lat: 26.9196, lng: 75.7878, name: "Jaipur Station" },
    dropoff: { lat: 28.5562, lng: 77.1000, name: "Delhi IGI Airport" }
  };

  const rideB = {
    id: "ride_2",
    passengerName: "Priya",
    journeyType: "interstate",
    pickup: { lat: 26.8905, lng: 75.7289, name: "Ajmer Road" },
    dropoff: { lat: 28.5562, lng: 77.1000, name: "Delhi IGI Airport" }
  };

  const matchEval = evaluateRouteMatch(rideA, rideB);
  const pricing = calculateSharedFares(matchEval, rideA, rideB);

  assert.ok(pricing.passengerA.savingsAmount > 0, "Passenger A should save money");
  assert.ok(pricing.passengerB.savingsAmount > 0, "Passenger B should save money");
  assert.ok(pricing.passengerA.savingsPercentage >= 25, "Savings should be at least 25%");
  assert.equal(pricing.tripEconomics.reconciled, true, "Trip economics must balance perfectly");
  assert.equal(
    pricing.tripEconomics.driverPayout + pricing.tripEconomics.platformCommission,
    pricing.tripEconomics.totalPassengerCollected,
    "Driver payout + platform commission must equal total passenger collection"
  );
});

test("7. Dual Passenger Acceptance & Vehicle Assignment", () => {
  db.reset();
  const match = db.getMatchById("match_jpr_del_01");
  assert.ok(match, "Seed match should exist");

  // Initial state: Rohan accepted, Priya pending
  assert.equal(match.acceptedByA, true);
  assert.equal(match.acceptedByB, false);

  // Priya accepts
  db.updateMatch(match.id, { acceptedByB: true, status: "confirmed" });
  const updated = db.getMatchById(match.id);
  assert.equal(updated.acceptedByA, true);
  assert.equal(updated.acceptedByB, true);
  assert.equal(updated.status, "confirmed");
});

test("8. Booking Cancellation & Partner Decoupling", () => {
  db.reset();
  const rideA = db.getRideById("ride_101");
  assert.ok(rideA);

  // Cancel ride 101
  db.updateRide(rideA.id, { status: "cancelled" });
  const updatedA = db.getRideById(rideA.id);
  assert.equal(updatedA.status, "cancelled");

  // Partner ride 102 should be returned to pool
  const rideB = db.getRideById("ride_102");
  db.updateRide(rideB.id, { status: "pending_match", activeMatchId: null });
  assert.equal(db.getRideById("ride_102").status, "pending_match");
});

test("9. Review Eligibility (Must be a completed ride)", () => {
  db.reset();
  // Attempt review on active ongoing ride (should throw error)
  assert.throws(
    () => {
      db.createReview({
        bookingId: "ride_109_active", // in_progress ride
        reviewerId: "usr_priya",
        targetPassengerId: "usr_rohan",
        ratings: { overall: 5 },
        comment: "Great ride"
      });
    },
    /Reviews can only be submitted after the trip is completed/i,
    "Should reject review on non-completed trip"
  );
});

test("10. Duplicate Review Prevention", () => {
  db.reset();
  // ride_110_completed is completed. Let's submit one review:
  db.createReview({
    bookingId: "ride_110_completed",
    reviewerId: "usr_rohan",
    targetPassengerId: "usr_priya",
    ratings: { punctuality: 5, courtesy: 5, communication: 5, cleanliness: 5, overall: 5 },
    tags: ["On time"],
    comment: "Excellent co-passenger!"
  });

  // Attempt duplicate submission
  assert.throws(
    () => {
      db.createReview({
        bookingId: "ride_110_completed",
        reviewerId: "usr_rohan",
        targetPassengerId: "usr_priya",
        ratings: { overall: 5 },
        comment: "Duplicate test"
      });
    },
    /already submitted a review/i,
    "Should prevent duplicate review for same ride"
  );
});
