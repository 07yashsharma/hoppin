/**
 * RouteMate AI - In-Memory Relational Database Store
 * Maintains atomic operations, relations, constraint checks, and seed data.
 */

import {
  INITIAL_USERS,
  INITIAL_VEHICLES,
  INITIAL_RIDE_REQUESTS,
  INITIAL_MATCHES,
  INITIAL_REVIEWS,
  INITIAL_SAFETY_INCIDENTS
} from "./seedData.js";
import { LOCATIONS } from "./locations.js";

class DatabaseStore {
  constructor() {
    this.reset();
  }

  reset() {
    // Deep clone initial datasets
    this.users = JSON.parse(JSON.stringify(INITIAL_USERS));
    this.vehicles = JSON.parse(JSON.stringify(INITIAL_VEHICLES));
    this.rides = JSON.parse(JSON.stringify(INITIAL_RIDE_REQUESTS));
    this.matches = JSON.parse(JSON.stringify(INITIAL_MATCHES));
    this.reviews = JSON.parse(JSON.stringify(INITIAL_REVIEWS));
    this.incidents = JSON.parse(JSON.stringify(INITIAL_SAFETY_INCIDENTS));
    this.blockedUsers = []; // [{ blockerId, blockedId, reason, createdAt }]
    this.notifications = [
      {
        id: "notif_1",
        userId: "usr_priya",
        title: "Compatible Shared Ride Found!",
        message: "Rohan Sharma is traveling from Jaipur to Delhi Airport around your time (Score 94%). Review and accept the match to save ₹1,380.",
        type: "match_alert",
        link: "/matches",
        read: false,
        createdAt: "2026-10-23T18:16:00Z"
      },
      {
        id: "notif_2",
        userId: "usr_rohan",
        title: "Pending Match Approval",
        message: "You have accepted the match with Priya Patel. Awaiting Priya's confirmation to assign Toyota Innova Crysta.",
        type: "match_status",
        link: "/matches",
        read: true,
        createdAt: "2026-10-23T18:20:00Z"
      }
    ];

    this.systemConfig = {
      platformCommissionPct: 15,
      driverPayoutPct: 85,
      autoAssignDriver: true,
      emergencyServiceEnabled: false, // Clear demo mode flag
      co2EmissionPerKmKg: 0.18
    };

    // Active session for current user (Default to Rohan Sharma)
    this.currentUserId = "usr_rohan";
  }

  // --- CURRENT USER & AUTH ---
  getCurrentUser() {
    return this.users.find(u => u.id === this.currentUserId) || this.users[0];
  }

  setCurrentUser(userId) {
    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error(`User with ID ${userId} not found`);
    this.currentUserId = userId;
    return user;
  }

  getUserById(id) {
    return this.users.find(u => u.id === id) || null;
  }

  getAllUsers() {
    return this.users;
  }

  updateUser(id, updates) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...updates };
    return this.users[idx];
  }

  // --- VEHICLES & DRIVERS ---
  getAllVehicles() {
    return this.vehicles;
  }

  getVehicleById(id) {
    return this.vehicles.find(v => v.id === id) || null;
  }

  getAllDrivers() {
    return this.users.filter(u => u.role === "driver");
  }

  // --- RIDE REQUESTS ---
  getAllRides(filter = {}) {
    let result = [...this.rides];
    if (filter.userId) {
      result = result.filter(r => r.userId === filter.userId);
    }
    if (filter.status) {
      result = result.filter(r => r.status === filter.status);
    }
    if (filter.journeyType) {
      result = result.filter(r => r.journeyType === filter.journeyType);
    }
    return result;
  }

  getRideById(id) {
    return this.rides.find(r => r.id === id) || null;
  }

  createRide(rideData) {
    const id = `ride_${Date.now()}`;
    const user = this.getUserById(rideData.userId) || this.getCurrentUser();
    const newRide = {
      id,
      userId: user.id,
      passengerName: user.name,
      passengerAvatar: user.avatar,
      passengerRating: user.averageRating || 5.0,
      createdAt: new Date().toISOString(),
      status: rideData.rideType === "shared" ? "pending_match" : "confirmed",
      ...rideData
    };
    this.rides.unshift(newRide);

    // Add notification
    this.notifications.unshift({
      id: `notif_${Date.now()}`,
      userId: user.id,
      title: "Booking Created",
      message: `Your booking for ${newRide.pickup.name} to ${newRide.dropoff.name} has been placed.`,
      type: "booking",
      link: `/ride/${id}`,
      read: false,
      createdAt: new Date().toISOString()
    });

    return newRide;
  }

  updateRide(id, updates) {
    const idx = this.rides.findIndex(r => r.id === id);
    if (idx === -1) return null;
    this.rides[idx] = { ...this.rides[idx], ...updates };
    return this.rides[idx];
  }

  // --- MATCHES ---
  getAllMatches() {
    return this.matches;
  }

  getMatchById(id) {
    return this.matches.find(m => m.id === id) || null;
  }

  createMatch(matchData) {
    const id = `match_${Date.now()}`;
    const newMatch = {
      id,
      createdAt: new Date().toISOString(),
      status: "pending_acceptance",
      acceptedByA: false,
      acceptedByB: false,
      ...matchData
    };
    this.matches.unshift(newMatch);
    return newMatch;
  }

  updateMatch(id, updates) {
    const idx = this.matches.findIndex(m => m.id === id);
    if (idx === -1) return null;
    this.matches[idx] = { ...this.matches[idx], ...updates };
    return this.matches[idx];
  }

  // --- REVIEWS ---
  getAllReviews() {
    return this.reviews;
  }

  getReviewsForUser(userId) {
    return this.reviews.filter(r => r.targetPassengerId === userId);
  }

  hasUserReviewedRide(reviewerId, bookingId) {
    return this.reviews.some(
      r => r.reviewerId === reviewerId && r.bookingId === bookingId
    );
  }

  createReview(reviewData) {
    // 1. Check if eligible: must reference a completed ride
    const ride = this.getRideById(reviewData.bookingId);
    if (!ride) {
      throw new Error("Review must be tied to a valid booking.");
    }
    if (ride.status !== "completed") {
      throw new Error("Reviews can only be submitted after the trip is completed.");
    }

    // 2. Prevent duplicate reviews
    if (this.hasUserReviewedRide(reviewData.reviewerId, reviewData.bookingId)) {
      throw new Error("You have already submitted a review for this completed ride.");
    }

    const id = `rev_${Date.now()}`;
    const newReview = {
      id,
      createdAt: new Date().toISOString(),
      ...reviewData
    };
    this.reviews.unshift(newReview);

    // Update target user's review counts and average rating
    const targetUser = this.getUserById(reviewData.targetPassengerId);
    if (targetUser) {
      const userReviews = this.getReviewsForUser(targetUser.id);
      const totalOverall = userReviews.reduce((sum, r) => sum + (r.ratings.overall || 5), 0);
      const newAvg = Number((totalOverall / userReviews.length).toFixed(2));
      
      this.updateUser(targetUser.id, {
        averageRating: newAvg,
        reviewCount: userReviews.length
      });
    }

    // Mark ride as reviewed
    this.updateRide(reviewData.bookingId, { hasReviewedCoPassenger: true });

    return newReview;
  }

  // --- SAFETY & INCIDENTS ---
  createIncidentReport(incidentData) {
    const id = `inc_${Date.now()}`;
    const newIncident = {
      id,
      status: "investigating",
      createdAt: new Date().toISOString(),
      adminNotes: "Under review by RouteMate Trust & Safety desk.",
      ...incidentData
    };
    this.incidents.unshift(newIncident);
    return newIncident;
  }

  blockUser(blockerId, blockedId, reason = "") {
    if (this.blockedUsers.some(b => b.blockerId === blockerId && b.blockedId === blockedId)) {
      return { success: true, message: "User is already blocked" };
    }
    this.blockedUsers.push({
      blockerId,
      blockedId,
      reason,
      createdAt: new Date().toISOString()
    });
    return { success: true, message: "User blocked from future route matching" };
  }

  isUserBlocked(userAId, userBId) {
    return this.blockedUsers.some(
      b =>
        (b.blockerId === userAId && b.blockedId === userBId) ||
        (b.blockerId === userBId && b.blockedId === userAId)
    );
  }

  // --- NOTIFICATIONS ---
  getNotifications(userId) {
    return this.notifications.filter(n => n.userId === userId);
  }

  markNotificationRead(id) {
    const n = this.notifications.find(item => item.id === id);
    if (n) n.read = true;
    return n;
  }
}

export const db = new DatabaseStore();
