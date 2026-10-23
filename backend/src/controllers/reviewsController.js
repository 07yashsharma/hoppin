/**
 * RouteMate AI - Passenger Reviews & Rating Controller
 */
import { db } from "../data/db.js";

export function submitReview(req, res) {
  try {
    const {
      bookingId,
      targetPassengerId,
      ratings,
      tags = [],
      comment = ""
    } = req.body;

    if (!bookingId || !targetPassengerId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and Target Passenger ID are required"
      });
    }

    if (!ratings || !ratings.overall) {
      return res.status(400).json({
        success: false,
        message: "Ratings object with at least overall rating (1-5) is required"
      });
    }

    const reviewer = db.getCurrentUser();

    // Verify ride eligibility
    const ride = db.getRideById(bookingId);
    if (!ride) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (ride.status !== "completed") {
      return res.status(403).json({
        success: false,
        message: "Reviews can only be submitted after the trip is completed."
      });
    }

    // Verify reviewer was part of this ride
    const isEligible = ride.userId === reviewer.id || (ride.coPassenger && ride.coPassenger.id === reviewer.id);
    if (!isEligible) {
      return res.status(403).json({
        success: false,
        message: "Only passengers on the same completed ride can review each other."
      });
    }

    // Check duplicate
    if (db.hasUserReviewedRide(reviewer.id, bookingId)) {
      return res.status(409).json({
        success: false,
        message: "Duplicate review: You have already submitted a review for this completed ride."
      });
    }

    const reviewData = {
      bookingId,
      reviewerId: reviewer.id,
      reviewerName: reviewer.name,
      reviewerAvatar: reviewer.avatar,
      targetPassengerId,
      tripRoute: `${ride.pickup.name} to ${ride.dropoff.name}`,
      tripDate: ride.travelDate,
      ratings: {
        punctuality: Math.min(5, Math.max(1, Number(ratings.punctuality || ratings.overall))),
        courtesy: Math.min(5, Math.max(1, Number(ratings.courtesy || ratings.overall))),
        communication: Math.min(5, Math.max(1, Number(ratings.communication || ratings.overall))),
        cleanliness: Math.min(5, Math.max(1, Number(ratings.cleanliness || ratings.overall))),
        overall: Math.min(5, Math.max(1, Number(ratings.overall)))
      },
      tags,
      comment: comment.trim()
    };

    const newReview = db.createReview(reviewData);

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully! Thank you for strengthening community trust.",
      review: newReview
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

export function getReviewsForPassenger(req, res) {
  try {
    const { id } = req.params;
    const user = db.getUserById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Passenger profile not found" });
    }

    const reviews = db.getReviewsForUser(id);

    return res.json({
      success: true,
      passenger: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        averageRating: user.averageRating,
        ratingBreakdown: user.ratingBreakdown,
        reviewCount: user.reviewCount,
        totalCompletedRides: user.totalCompletedRides,
        phoneVerified: user.phoneVerified,
        emailVerified: user.emailVerified,
        idVerified: user.idVerified,
        bio: user.bio,
        preferredLanguage: user.preferredLanguage,
        preferences: user.preferences,
        topTags: user.topTags
      },
      reviewsCount: reviews.length,
      reviews
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function getAllReviews(req, res) {
  try {
    const reviews = db.getAllReviews();
    return res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
