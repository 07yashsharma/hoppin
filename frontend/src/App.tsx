import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

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

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
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
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
