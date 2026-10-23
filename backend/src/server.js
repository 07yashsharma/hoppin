/**
 * RouteMate AI - Backend Server Entrypoint
 */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { LOCATIONS, searchLocations, findLocationById } from "./data/locations.js";
import { db } from "./data/db.js";

import * as authController from "./controllers/authController.js";
import * as ridesController from "./controllers/ridesController.js";
import * as matchesController from "./controllers/matchesController.js";
import * as reviewsController from "./controllers/reviewsController.js";
import * as safetyController from "./controllers/safetyController.js";
import * as driverController from "./controllers/driverController.js";
import * as adminController from "./controllers/adminController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// --- LOCATIONS ---
app.get("/api/locations", (req, res) => {
  const { q, city } = req.query;
  const results = searchLocations(q, city);
  res.json({ success: true, count: results.length, locations: results });
});

app.get("/api/locations/:id", (req, res) => {
  const loc = findLocationById(req.params.id);
  if (!loc) return res.status(404).json({ success: false, message: "Location not found" });
  res.json({ success: true, location: loc });
});

// --- AUTH & DEMO SWITCHER ---
app.get("/api/auth/me", authController.getCurrentUser);
app.get("/api/auth/demo-accounts", authController.getAllDemoAccounts);
app.post("/api/auth/switch-demo", authController.switchDemoAccount);
app.post("/api/auth/login", authController.login);
app.post("/api/auth/register", authController.register);
app.post("/api/auth/forgot-password", authController.forgotPassword);
app.post("/api/auth/reset-password", authController.resetPassword);

// --- RIDES ---
app.get("/api/rides", ridesController.getAllRides);
app.get("/api/rides/:id", ridesController.getRideById);
app.post("/api/rides", ridesController.createRide);
app.post("/api/rides/:id/cancel", ridesController.cancelRide);
app.post("/api/rides/:id/simulate-status", ridesController.simulateRideStatus);

// --- MATCHES ---
app.get("/api/matches", matchesController.getAllMatches);
app.get("/api/matches/:id", matchesController.getMatchById);
app.get("/api/matches/for-ride/:rideId", matchesController.findMatchesForRide);
app.post("/api/matches/:id/accept", matchesController.acceptMatch);
app.post("/api/matches/:id/decline", matchesController.declineMatch);

// --- REVIEWS & PASSENGER PROFILES ---
app.get("/api/reviews", reviewsController.getAllReviews);
app.get("/api/reviews/passenger/:id", reviewsController.getReviewsForPassenger);
app.post("/api/reviews", reviewsController.submitReview);

// --- SAFETY ---
app.post("/api/safety/emergency-sos", safetyController.triggerEmergencySOS);
app.post("/api/safety/emergency-contact", safetyController.addEmergencyContact);
app.post("/api/safety/report", safetyController.reportIncident);
app.post("/api/safety/block", safetyController.blockUser);
app.get("/api/safety/incidents", safetyController.getAllIncidents);

// --- DRIVER ---
app.get("/api/driver/dashboard", driverController.getDriverDashboard);
app.post("/api/driver/trip-status", driverController.updateDriverTripStatus);

// --- ADMIN ---
app.get("/api/admin/analytics", adminController.getAdminAnalytics);
app.post("/api/admin/config", adminController.updateSystemConfig);
app.post("/api/admin/incidents/:id/resolve", adminController.resolveIncident);

// --- DEMO RESET ---
app.post("/api/demo/reset", (req, res) => {
  db.reset();
  res.json({ success: true, message: "Database reset to initial demo fixtures successfully." });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    platform: "hopin",
    version: "2.0.0-refined",
    activeUser: db.getCurrentUser().name,
    environment: "demo-verified"
  });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled API Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`hopin backend running on http://localhost:${PORT}`);
});
