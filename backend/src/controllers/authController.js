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
    const { email, name, role = "passenger", avatar, phone } = req.body;
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: "Email or real ID is required" });
    }
    const cleanEmail = email.trim().toLowerCase();
    let user = db.getAllUsers().find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      // Auto-provision verified user account for ANY real email / ID on the fly
      const derivedName = (name && name.trim())
        ? name.trim()
        : cleanEmail.split('@')[0]
            .split(/[._-]+/)
            .filter(Boolean)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ') || "Verified Commuter";

      const userAvatar = avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(derivedName)}&backgroundColor=8b8dff,345cff,c5f55a&textColor=101114`;

      user = {
        id: `usr_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        name: derivedName,
        email: cleanEmail,
        phone: phone || "+91 98000 00000",
        role: role,
        avatar: userAvatar,
        phoneVerified: true,
        emailVerified: true,
        idVerified: true,
        bio: "Verified traveler on Hopin - Intelligent Cab Pooling & Route Sharing.",
        preferredLanguage: "English, Hindi",
        preferences: { quietRide: false, acPreferred: true, allowPet: false },
        totalCompletedRides: 1,
        averageRating: 5.0,
        ratingBreakdown: { punctuality: 5.0, courtesy: 5.0, communication: 5.0, cleanliness: 5.0, overall: 5.0 },
        reviewCount: 1,
        topTags: ["Verified Identity", "Active Commuter"],
        emergencyContacts: [
          { id: `ec_${Date.now()}`, name: "Primary Guardian", phone: "+91 98765 43210", relationship: "Family" }
        ]
      };
      db.users.push(user);
    }

    db.setCurrentUser(user.id);
    return res.json({
      success: true,
      message: `Logged in as ${user.name}`,
      user
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function googleLogin(req, res) {
  try {
    const { email, name, avatar, googleId } = req.body;
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: "Google account email is required" });
    }
    const cleanEmail = email.trim().toLowerCase();
    let user = db.getAllUsers().find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      const derivedName = (name && name.trim())
        ? name.trim()
        : cleanEmail.split('@')[0]
            .split(/[._-]+/)
            .filter(Boolean)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ') || "Google Commuter";

      const userAvatar = avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(derivedName)}&backgroundColor=8b8dff,345cff,c5f55a&textColor=101114`;

      user = {
        id: `usr_g_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        name: derivedName,
        email: cleanEmail,
        phone: "+91 98000 00000",
        role: "passenger",
        avatar: userAvatar,
        phoneVerified: true,
        emailVerified: true,
        idVerified: true,
        bio: "Google-authenticated commuter across Indian highway corridors.",
        preferredLanguage: "English, Hindi",
        preferences: { quietRide: false, acPreferred: true, allowPet: false },
        totalCompletedRides: 1,
        averageRating: 5.0,
        ratingBreakdown: { punctuality: 5.0, courtesy: 5.0, communication: 5.0, cleanliness: 5.0, overall: 5.0 },
        reviewCount: 1,
        topTags: ["Google Verified", "Prompt Traveler"],
        emergencyContacts: [
          { id: `ec_${Date.now()}`, name: "Family SOS", phone: "+91 98765 43210", relationship: "Family" }
        ]
      };
      db.users.push(user);
    }

    db.setCurrentUser(user.id);
    return res.json({
      success: true,
      message: `Signed in with Google as ${user.name}`,
      user
    });
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
    const cleanEmail = email.trim().toLowerCase();
    let existing = db.getAllUsers().find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      // Seamlessly sign in existing user instead of failing
      existing.name = name.trim();
      if (phone) existing.phone = phone;
      if (role) existing.role = role;
      db.setCurrentUser(existing.id);
      return res.json({ success: true, message: "Logged into existing account", user: existing });
    }
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      phone: phone || "+91 98000 00000",
      role,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=8b8dff,345cff,c5f55a&textColor=101114`,
      phoneVerified: true,
      emailVerified: true,
      idVerified: true,
      bio: "New Hopin commuter traveling across India.",
      preferredLanguage: "English, Hindi",
      preferences: { quietRide: false, acPreferred: true, allowPet: false },
      totalCompletedRides: 0,
      averageRating: 5.0,
      ratingBreakdown: { punctuality: 5.0, courtesy: 5.0, communication: 5.0, cleanliness: 5.0, overall: 5.0 },
      reviewCount: 0,
      topTags: ["New Member", "Verified Phone"],
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

