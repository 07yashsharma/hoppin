/**
 * RouteMate AI - Ride Management Controller
 */
import { db } from "../data/db.js";
import {
  estimateRoadDistance,
  estimateDurationMinutes,
  evaluateRouteMatch
} from "../services/routeEngine.js";
import {
  calculatePrivateFare,
  calculateSharedFares
} from "../services/pricingService.js";

export function createRide(req, res) {
  try {
    const {
      pickup,
      dropoff,
      travelDate,
      departureTime,
      journeyType = "city",
      rideType = "shared",
      passengerCount = 1,
      luggageCount = 1,
      maxDetourMinutes = 20,
      preferences = {}
    } = req.body;

    if (!pickup || !dropoff || !pickup.lat || !dropoff.lat) {
      return res.status(400).json({
        success: false,
        message: "Valid pickup and dropoff locations with coordinates are required"
      });
    }

    if (!travelDate || !departureTime) {
      return res.status(400).json({
        success: false,
        message: "Travel date and departure time are required"
      });
    }

    const currentUser = db.getCurrentUser();

    // Calculate solo distance and duration
    const distanceKm = estimateRoadDistance(
      pickup.lat,
      pickup.lng,
      dropoff.lat,
      dropoff.lng,
      journeyType
    );
    const durationMinutes = estimateDurationMinutes(distanceKm, journeyType);

    // Calculate private fare estimate
    const privateFareInfo = calculatePrivateFare(distanceKm, durationMinutes, journeyType);

    // If shared, estimated price is ~35% discounted
    const estimatedSharedFare = Math.round(privateFareInfo.total * 0.63);

    const rideData = {
      userId: currentUser.id,
      passengerName: currentUser.name,
      passengerAvatar: currentUser.avatar,
      passengerRating: currentUser.averageRating || 5.0,
      journeyType,
      rideType,
      pickup,
      dropoff,
      travelDate,
      departureTime,
      passengerCount: Number(passengerCount),
      luggageCount: Number(luggageCount),
      maxDetourMinutes: Number(maxDetourMinutes),
      preferences,
      distanceKm,
      durationMinutes,
      privateFare: privateFareInfo.total,
      fare: rideType === "shared" ? estimatedSharedFare : privateFareInfo.total,
      fareBreakdown: privateFareInfo,
      estimatedSavings: rideType === "shared" ? privateFareInfo.total - estimatedSharedFare : 0,
      status: rideType === "shared" ? "pending_match" : "driver_assigned",
      otp: Math.floor(1000 + Math.random() * 9000).toString()
    };

    // If private cab, immediately assign a driver
    if (rideType === "private") {
      const drivers = db.getAllDrivers();
      const driver = drivers[0];
      const vehicle = db.getVehicleById(driver.vehicleId);
      rideData.assignedDriverId = driver.id;
      rideData.driverName = driver.name;
      rideData.driverPhone = driver.phone;
      rideData.driverRating = driver.rating;
      rideData.vehiclePlate = vehicle ? vehicle.plateNumber : "RJ 14 TC 9999";
      rideData.vehicleModel = vehicle ? vehicle.model : "Prime Sedan";
    }

    const newRide = db.createRide(rideData);

    // If shared, check if there is an immediate candidate to match with
    let autoMatch = null;
    if (rideType === "shared") {
      const pendingRides = db.getAllRides({ status: "pending_match" }).filter(
        r => r.id !== newRide.id && r.userId !== currentUser.id && !db.isUserBlocked(currentUser.id, r.userId)
      );

      for (const candidate of pendingRides) {
        const evaluation = evaluateRouteMatch(newRide, candidate);
        if (evaluation.compatible && evaluation.score >= 60) {
          const pricing = calculateSharedFares(evaluation, newRide, candidate);
          autoMatch = db.createMatch({
            rideAId: newRide.id,
            rideBId: candidate.id,
            passengerAName: newRide.passengerName,
            passengerBName: candidate.passengerName,
            passengerAId: newRide.userId,
            passengerBId: candidate.userId,
            passengerAAvatar: newRide.passengerAvatar,
            passengerBAvatar: candidate.passengerAvatar,
            journeyType: newRide.journeyType,
            routeTitle: `${newRide.pickup.name} & ${candidate.pickup.name} to ${newRide.dropoff.name}`,
            score: evaluation.score,
            status: "pending_acceptance",
            acceptedByA: true, // Auto-accepted by the creator
            acceptedByB: false,
            reasons: evaluation.reasons,
            pricing,
            waypoints: evaluation.routeOptimization.waypoints.map((wp, idx) => ({
              order: idx + 1,
              type: wp.type,
              passenger: wp.passenger === "A" ? newRide.passengerName : candidate.passengerName,
              locationName: wp.location.name,
              time: idx === 0 ? newRide.departureTime : "+15m"
            }))
          });

          // Update statuses to matched
          db.updateRide(newRide.id, { status: "matched", activeMatchId: autoMatch.id });
          db.updateRide(candidate.id, { status: "matched", activeMatchId: autoMatch.id });
          break;
        }
      }
    }

    return res.status(201).json({
      success: true,
      message: autoMatch
        ? "Ride booked and compatible co-passenger match identified!"
        : "Ride booked successfully. Searching for compatible route matches.",
      ride: db.getRideById(newRide.id),
      match: autoMatch
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function getAllRides(req, res) {
  try {
    const { userId, status, journeyType } = req.query;
    const rides = db.getAllRides({ userId, status, journeyType });
    return res.json({ success: true, count: rides.length, rides });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function getRideById(req, res) {
  try {
    const { id } = req.params;
    const ride = db.getRideById(id);
    if (!ride) {
      return res.status(404).json({ success: false, message: "Ride not found" });
    }

    // Attach active match info if available
    let matchInfo = null;
    if (ride.activeMatchId) {
      matchInfo = db.getMatchById(ride.activeMatchId);
    }

    return res.json({ success: true, ride, match: matchInfo });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function cancelRide(req, res) {
  try {
    const { id } = req.params;
    const ride = db.getRideById(id);
    if (!ride) {
      return res.status(404).json({ success: false, message: "Ride not found" });
    }

    if (ride.status === "completed" || ride.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel a ride that is already ${ride.status}`
      });
    }

    // If ride was part of an active match, uncouple the other passenger back to pending_match
    if (ride.activeMatchId) {
      const match = db.getMatchById(ride.activeMatchId);
      if (match) {
        db.updateMatch(match.id, { status: "cancelled_by_partner" });
        const partnerRideId = match.rideAId === ride.id ? match.rideBId : match.rideAId;
        db.updateRide(partnerRideId, {
          status: "pending_match",
          activeMatchId: null
        });
      }
    }

    const updated = db.updateRide(id, {
      status: "cancelled",
      cancelledAt: new Date().toISOString()
    });

    return res.json({
      success: true,
      message: "Ride has been cancelled successfully",
      ride: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function simulateRideStatus(req, res) {
  try {
    const { id } = req.params;
    const { nextStatus } = req.body;
    const ride = db.getRideById(id);
    if (!ride) {
      return res.status(404).json({ success: false, message: "Ride not found" });
    }

    const validTransitions = {
      pending_match: ["matched", "driver_assigned", "cancelled"],
      matched: ["driver_assigned", "cancelled"],
      driver_assigned: ["arriving", "cancelled"],
      arriving: ["in_progress", "cancelled"],
      in_progress: ["completed"],
      completed: [],
      cancelled: []
    };

    const targetStatus = nextStatus || (
      ride.status === "pending_match" ? "driver_assigned" :
      ride.status === "matched" ? "driver_assigned" :
      ride.status === "driver_assigned" ? "arriving" :
      ride.status === "arriving" ? "in_progress" :
      ride.status === "in_progress" ? "completed" : ride.status
    );

    const updates = { status: targetStatus };

    // If moving to driver_assigned or in_progress, ensure driver and vehicle are assigned
    if ((targetStatus === "driver_assigned" || targetStatus === "in_progress") && !ride.assignedDriverId) {
      const driver = db.getAllDrivers()[0];
      const vehicle = db.getVehicleById(driver.vehicleId);
      updates.assignedDriverId = driver.id;
      updates.driverName = driver.name;
      updates.driverPhone = driver.phone;
      updates.driverRating = driver.rating;
      updates.vehiclePlate = vehicle.plateNumber;
      updates.vehicleModel = vehicle.model;
    }

    if (targetStatus === "completed") {
      updates.completedAt = new Date().toISOString();
      updates.hasReviewedCoPassenger = false;
      // Increment user's total ride counter
      const user = db.getUserById(ride.userId);
      if (user) {
        db.updateUser(user.id, { totalCompletedRides: (user.totalCompletedRides || 0) + 1 });
      }
    }

    const updated = db.updateRide(id, updates);
    return res.json({
      success: true,
      message: `Trip status updated to ${targetStatus}`,
      ride: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
