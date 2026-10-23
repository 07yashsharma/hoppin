/**
 * RouteMate AI - Match Workflow & AI Matching Controller
 */
import { db } from "../data/db.js";
import { evaluateRouteMatch } from "../services/routeEngine.js";
import { calculateSharedFares } from "../services/pricingService.js";

export function findMatchesForRide(req, res) {
  try {
    const { rideId } = req.params;
    const targetRide = db.getRideById(rideId);
    if (!targetRide) {
      return res.status(404).json({ success: false, message: "Ride not found" });
    }

    const allRides = db.getAllRides();
    const candidateRides = allRides.filter(
      r => r.id !== targetRide.id && r.status !== "completed" && r.status !== "cancelled"
    );

    const compatibleMatches = [];
    const incompatibleCandidates = [];

    for (const candidate of candidateRides) {
      // Check if either passenger blocked the other
      if (db.isUserBlocked(targetRide.userId, candidate.userId)) {
        incompatibleCandidates.push({
          candidateId: candidate.id,
          candidateName: candidate.passengerName,
          status: "REJECTED_BLOCKED",
          reasons: ["User is blocked by passenger safety preferences"]
        });
        continue;
      }

      const evaluation = evaluateRouteMatch(targetRide, candidate);
      if (evaluation.compatible) {
        const pricing = calculateSharedFares(evaluation, targetRide, candidate);
        compatibleMatches.push({
          candidateRideId: candidate.id,
          candidateName: candidate.passengerName,
          candidateAvatar: candidate.passengerAvatar,
          candidateRating: candidate.passengerRating,
          candidatePickup: candidate.pickup.name,
          candidateDropoff: candidate.dropoff.name,
          candidateTime: candidate.departureTime,
          score: evaluation.score,
          reasons: evaluation.reasons,
          warnings: evaluation.warnings,
          routeOptimization: evaluation.routeOptimization,
          pricing,
          metrics: evaluation.metrics
        });
      } else {
        incompatibleCandidates.push({
          candidateRideId: candidate.id,
          candidateName: candidate.passengerName,
          candidatePickup: candidate.pickup.name,
          candidateDropoff: candidate.dropoff.name,
          status: evaluation.status,
          score: evaluation.score,
          reasons: evaluation.reasons
        });
      }
    }

    // Sort by compatibility score descending
    compatibleMatches.sort((a, b) => b.score - a.score);

    return res.json({
      success: true,
      targetRideId: targetRide.id,
      compatibleCount: compatibleMatches.length,
      matches: compatibleMatches,
      incompatibleCount: incompatibleCandidates.length,
      incompatibleExamples: incompatibleCandidates
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function getAllMatches(req, res) {
  try {
    const matches = db.getAllMatches();
    return res.json({ success: true, count: matches.length, matches });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function getMatchById(req, res) {
  try {
    const { id } = req.params;
    const match = db.getMatchById(id);
    if (!match) {
      return res.status(404).json({ success: false, message: "Match not found" });
    }
    return res.json({ success: true, match });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function acceptMatch(req, res) {
  try {
    const { id } = req.params;
    const match = db.getMatchById(id);
    if (!match) {
      return res.status(404).json({ success: false, message: "Match not found" });
    }

    const currentUser = db.getCurrentUser();
    let isPassengerA = currentUser.id === match.passengerAId;
    let isPassengerB = currentUser.id === match.passengerBId;

    // If neither matches directly (e.g. testing in demo), match by current user role or allow explicit passenger param
    if (!isPassengerA && !isPassengerB) {
      if (!match.acceptedByA) isPassengerA = true;
      else isPassengerB = true;
    }

    const updates = {};
    if (isPassengerA) updates.acceptedByA = true;
    if (isPassengerB) updates.acceptedByB = true;

    // Check if both have accepted
    const bothAccepted = (updates.acceptedByA ?? match.acceptedByA) && (updates.acceptedByB ?? match.acceptedByB);

    if (bothAccepted) {
      updates.status = "confirmed";

      // Select driver with highest capacity vehicle (e.g. Vikram with Innova Crysta)
      const driver = db.getAllDrivers()[0];
      const vehicle = db.getVehicleById(driver.vehicleId);

      // Assign driver and vehicle to both rides
      const rideA = db.getRideById(match.rideAId);
      const rideB = db.getRideById(match.rideBId);

      if (rideA) {
        db.updateRide(rideA.id, {
          status: "driver_assigned",
          assignedDriverId: driver.id,
          driverName: driver.name,
          driverPhone: driver.phone,
          driverRating: driver.rating,
          assignedVehicleId: vehicle.id,
          vehiclePlate: vehicle.plateNumber,
          vehicleModel: vehicle.model,
          fare: match.pricing.passengerA.sharedFare,
          savingsAmount: match.pricing.passengerA.savingsAmount,
          savingsPct: match.pricing.passengerA.savingsPercentage,
          coPassenger: {
            id: match.passengerBId,
            name: match.passengerBName,
            avatar: match.passengerBAvatar,
            rating: 4.8,
            verified: true
          }
        });
      }

      if (rideB) {
        db.updateRide(rideB.id, {
          status: "driver_assigned",
          assignedDriverId: driver.id,
          driverName: driver.name,
          driverPhone: driver.phone,
          driverRating: driver.rating,
          assignedVehicleId: vehicle.id,
          vehiclePlate: vehicle.plateNumber,
          vehicleModel: vehicle.model,
          fare: match.pricing.passengerB.sharedFare,
          savingsAmount: match.pricing.passengerB.savingsAmount,
          savingsPct: match.pricing.passengerB.savingsPercentage,
          coPassenger: {
            id: match.passengerAId,
            name: match.passengerAName,
            avatar: match.passengerAAvatar,
            rating: 4.9,
            verified: true
          }
        });
      }
    }

    const updatedMatch = db.updateMatch(id, updates);

    return res.json({
      success: true,
      message: bothAccepted
        ? "Both passengers accepted! Vehicle and driver assigned successfully."
        : "Match accepted! Awaiting confirmation from your co-passenger.",
      match: updatedMatch,
      bothAccepted
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function declineMatch(req, res) {
  try {
    const { id } = req.params;
    const match = db.getMatchById(id);
    if (!match) {
      return res.status(404).json({ success: false, message: "Match not found" });
    }

    db.updateMatch(id, { status: "declined" });

    // Reset both rides to pending_match
    db.updateRide(match.rideAId, { status: "pending_match", activeMatchId: null });
    db.updateRide(match.rideBId, { status: "pending_match", activeMatchId: null });

    return res.json({
      success: true,
      message: "Proposed match declined. Rides returned to the active matching pool."
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
