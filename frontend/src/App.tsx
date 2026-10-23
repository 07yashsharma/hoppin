import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoBanner } from './components/DemoBanner';

// Pages
import { Home } from './pages/Home';
import { BookRide } from './pages/BookRide';
import { SharedRides } from './pages/SharedRides';
import { Matches } from './pages/Matches';
import { RideDetails } from './pages/RideDetails';
import { UserDashboard } from './pages/UserDashboard';
import { UserProfile } from './pages/UserProfile';
import { PassengerProfile } from './pages/PassengerProfile';
import { Reviews } from './pages/Reviews';
import { DriverDashboard } from './pages/DriverDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Safety } from './pages/Safety';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Support } from './pages/Support';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-hopin-bg flex items-center justify-center font-mono text-xs text-hopin-muted">
        // INITIALIZING HOPIN HIGHWAY PLATFORM...
      </div>
    );
  }

  // 1. If not authenticated, always show the Start / Login Portal first!
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-hopin-bg text-hopin-dark font-sans page-transition">
        {/* Banner with 1-click persona fast-switch */}
        <DemoBanner />
        
        <main className="flex-1">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </main>

        <Footer />
      </div>
    );
  }

  // 2. Once authenticated, unlock full platform & navigation:
  return (
    <div className="min-h-screen flex flex-col bg-hopin-bg text-hopin-dark font-sans page-transition">
      {/* Top Interactive Demo Persona & Reset Bar */}
      <DemoBanner />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Viewport */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookRide />} />
          <Route path="/shared-rides" element={<SharedRides />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/ride/:id" element={<RideDetails />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/passenger/:id" element={<PassengerProfile />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/support" element={<Support />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
