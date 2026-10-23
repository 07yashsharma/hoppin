/**
 * RouteMate AI - Driver Dashboard Controller
 */
import { db } from "../data/db.js";

export function getDriverDashboard(req, res) {
  try {
    const user = db.getCurrentUser();
    // Default to Vikram Singh if current user is not a driver
    const driver = user.role === "driver" ? user : db.getAllDrivers()[0];
    const vehicle = db.getVehicleById(driver.vehicleId);

    // Get rides assigned to this driver
    const assignedRides = db.getAllRides().filter(
      r => r.assignedDriverId === driver.id && r.status !== "completed" && r.status !== "cancelled"
    );

    const completedRides = db.getAllRides().filter(
      r => r.assignedDriverId === driver.id && r.status === "completed"
    );

    // Available unassigned shared pools ready for pickup
    const availablePools = db.getAllMatches().filter(
      m => m.status === "confirmed" && !assignedRides.some(r => r.activeMatchId === m.id)
    );

    return res.json({
      success: true,
      driver: {
        id: driver.id,
        name: driver.name,
        avatar: driver.avatar,
        phone: driver.phone,
        driverLicense: driver.driverLicenseNumber,
        commercialPermit: driver.commercialPermit,
        rating: driver.rating,
        totalTrips: driver.totalTrips,
        todayEarnings: driver.todayEarnings || 4250,
        walletBalance: driver.walletBalance || 18400,
        status: driver.status || "online"
      },
      vehicle,
      assignedRides,
      completedRides,
      availablePools
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function updateDriverTripStatus(req, res) {
  try {
    const { rideId, status } = req.body;
    if (!rideId || !status) {
      return res.status(400).json({ success: false, message: "rideId and status are required" });
    }

    const ride = db.getRideById(rideId);
    if (!ride) {
      return res.status(404).json({ success: false, message: "Ride not found" });
    }

    const updates = { status };
    if (status === "completed") {
      updates.completedAt = new Date().toISOString();
      // Credit driver wallet
      const driver = db.getAllDrivers()[0];
      const payout = Math.round((ride.fare || 1500) * 0.85);
      db.updateUser(driver.id, {
        todayEarnings: (driver.todayEarnings || 0) + payout,
        walletBalance: (driver.walletBalance || 0) + payout,
        totalTrips: (driver.totalTrips || 0) + 1
      });
    }

    const updated = db.updateRide(rideId, updates);
    return res.json({
      success: true,
      message: `Trip status updated to ${status}`,
      ride: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
