/**
 * RouteMate AI - Auth & Demo Account Controller
 */
import { db } from "../data/db.js";

export function getCurrentUser(req, res) {
  try {
    const user = db.getCurrentUser();
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function switchDemoAccount(req, res) {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }
    const user = db.setCurrentUser(userId);
    return res.json({
      success: true,
      message: `Switched session to ${user.name} (${user.role})`,
      user
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

export function getAllDemoAccounts(req, res) {
  try {
    const users = db.getAllUsers();
    return res.json({
      success: true,
      accounts: users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        avatar: u.avatar,
        phoneVerified: u.phoneVerified,
        idVerified: u.idVerified,
        rating: u.averageRating || u.rating,
        vehicleModel: u.role === "driver" ? "Toyota Innova / Dzire" : undefined
      }))
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function login(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    const user = db.getAllUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found with this email" });
    }
    db.setCurrentUser(user.id);
    return res.json({ success: true, message: `Logged in as ${user.name}`, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function register(req, res) {
  try {
    const { name, email, phone, role = "passenger" } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }
    const existing = db.getAllUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ success: false, message: "Email is already registered" });
    }
    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone: phone || "+91 98000 00000",
      role,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      phoneVerified: true,
      emailVerified: true,
      idVerified: false,
      bio: "New RouteMate commuter traveling across India.",
      preferredLanguage: "English, Hindi",
      preferences: { quietRide: false, acPreferred: true, allowPet: false },
      totalCompletedRides: 0,
      averageRating: 5.0,
      ratingBreakdown: { punctuality: 5.0, courtesy: 5.0, communication: 5.0, cleanliness: 5.0, overall: 5.0 },
      reviewCount: 0,
      topTags: ["New Member"],
      emergencyContacts: []
    };
    db.users.push(newUser);
    db.setCurrentUser(newUser.id);
    return res.status(201).json({ success: true, message: "Account created successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    const user = db.getAllUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(404).json({ success: false, message: "No account registered with this email address" });
    }
    return res.json({
      success: true,
      message: `Password reset instructions transmitted to ${email}. Verification token active for 15 minutes.`,
      resetToken: `rst_${Date.now()}`
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function resetPassword(req, res) {
  try {
    const { email, newPassword, token } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: "Email and new password are required" });
    }
    const user = db.getAllUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.json({
      success: true,
      message: "Password updated successfully. You can now authenticate with your new credentials."
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

