/**
 * RouteMate AI - Safety & Incident Reporting Controller
 */
import { db } from "../data/db.js";

export function triggerEmergencySOS(req, res) {
  try {
    const { rideId, currentLocation } = req.body;
    const user = db.getCurrentUser();
    const ride = rideId ? db.getRideById(rideId) : null;

    const incident = db.createIncidentReport({
      reporterId: user.id,
      reporterName: user.name,
      reportedUserId: ride?.assignedDriverId || "unknown",
      reportedUserName: ride?.driverName || "Driver / Cab Service",
      bookingId: rideId || "none",
      category: "emergency_sos",
      severity: "high",
      description: `Emergency SOS triggered by ${user.name}. Location: ${
        currentLocation?.address || "Jaipur-Delhi Highway Corridor"
      }. (DEMO MODE: Simulated Alert)`,
      status: "action_required"
    });

    return res.json({
      success: true,
      demoMode: true,
      message: "EMERGENCY SOS SIMULATION TRIGGERED: In production, local police dispatch and registered emergency contacts receive real-time SMS & GPS tracking. (This is a working demo environment; no real 112/police dispatch was contacted).",
      incidentId: incident.id,
      contactsAlerted: user.emergencyContacts || [],
      gpsCoordinates: currentLocation || { lat: 27.8872, lng: 76.2825, checkpoint: "Behror Highway Corridor" }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function addEmergencyContact(req, res) {
  try {
    const { name, phone, relationship } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Contact name and phone are required" });
    }

    const user = db.getCurrentUser();
    const contacts = user.emergencyContacts || [];
    const newContact = {
      id: `em_${Date.now()}`,
      name,
      phone,
      relationship: relationship || "Family"
    };

    contacts.push(newContact);
    db.updateUser(user.id, { emergencyContacts: contacts });

    return res.status(201).json({
      success: true,
      message: "Emergency contact added securely",
      contact: newContact
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function reportIncident(req, res) {
  try {
    const { reportedUserId, bookingId, category, severity = "medium", description } = req.body;
    if (!description) {
      return res.status(400).json({ success: false, message: "Incident description is required" });
    }

    const reporter = db.getCurrentUser();
    const incident = db.createIncidentReport({
      reporterId: reporter.id,
      reporterName: reporter.name,
      reportedUserId: reportedUserId || null,
      bookingId: bookingId || null,
      category: category || "general",
      severity,
      description
    });

    return res.status(201).json({
      success: true,
      message: "Incident report submitted. Our Trust & Safety team investigates within 24 hours.",
      incident
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function blockUser(req, res) {
  try {
    const { targetUserId, reason } = req.body;
    if (!targetUserId) {
      return res.status(400).json({ success: false, message: "Target user ID is required" });
    }
    const currentUser = db.getCurrentUser();
    const result = db.blockUser(currentUser.id, targetUserId, reason);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function getAllIncidents(req, res) {
  try {
    return res.json({ success: true, count: db.incidents.length, incidents: db.incidents });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
